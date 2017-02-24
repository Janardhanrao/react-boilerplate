var React = require('react')
import StreamStore from 'stores/StreamStore'
import CourseDashBoardStore from 'stores/CourseDashBoardStore'
import globalStore from 'stores/GlobalStore'
import notificationStore from 'stores/NotificationStore'
import {FOCUS,BLUR} from 'constants/globalConstants'
import Alert from 'react-s-alert'
import GroupChatPool from 'components/GroupChat/GroupChatPool.react'
import {generateRouteForNotifications} from 'utils/AppUtils'
import emojione from 'emojione'

export function onSocketMessage (message) {
  let deepLinkingData;
  try{
    deepLinkingData = JSON.parse(message.deepLinkingData)
  } catch (e){
    console.log('Exception',e)
    deepLinkingData = {}
  }

  let newMessage = {
    ...message,
    deepLinkingData
  }
  switch (message.eventType) {
    case 'INTERACTION':
      StreamStore.addMessage(newMessage.feedId, newMessage.clientMessageKey, newMessage)
      break
    case 'CHAT':
      if(newMessage.deepLinkingData.groupType === "PROJECT GROUP"){        
        if(GroupChatPool.isGroupChatCreated(newMessage.deepLinkingData.groupId,newMessage.feedId)){
          handleNotificationClick(newMessage,"CHAT")
        }else{
          var options = {
            body: `${newMessage.senderName}: ${newMessage.messagePreview}`,
            icon: newMessage.senderThumbnailURL,
            tag: newMessage.messageId
          }
          notifyMeChromeNotification(
            'Adaptive Engine',
            options,
            () => {
              handleNotificationClick(newMessage,"CHAT")
            }
          )
        }
      }
      break
    case 'NOTIFICATION':
      // notifyMe(newMessage,"NOTIFICATION")
      // notificationStore.addUnReadNotification(newMessage)
      break
    case 'ACTIVITY':
      CourseDashBoardStore.addCourseActivityItem(newMessage)
      break
    case 'GENERAL':
      break
  }
}

function handleNotificationClick (message,type){
  if(type==="CHAT"){
    GroupChatPool.handleGroupChatMessage(
      message.deepLinkingData.groupId,
      message.feedId,
      message.deepLinkingData.groupType,
      message,
      message.deepLinkingExtraData
    )
  }
}

export function notifyMe(message,type) {
  console.log('globalStore.windowState',globalStore.windowState);
  if(globalStore.windowState === FOCUS){
    notifyMeInsideApp(message,type)
  }else {
    let icon = message.senderThumbnailURL
              ? message.senderThumbnailURL
              : AppConstants.HOSTING_PREFIX + '/images/ae_logo.png'

    let title = message.senderName
                ? message.senderName
                : 'Adaptive Engine'

    let options = {
      body: `${message.senderName}: ${message.messagePreview}`,
      icon: icon,
      tag: message.messageId
    }

    notifyMeChromeNotification(title,options)
  }
}

function notifyMeInsideApp(message,type){
  if(type=== 'CHAT'){
    // Alert.success(emojione.shortnameToImage(message.messagePreview), {
    //   effect: 'genie',
    //   position: 'bottom-left',
    //   timeout: 2000,
    //   html: true
    // });
  }else if(type === 'NOTIFICATION'){
    Alert.success('' ,{
      effect: 'scale',
      position: 'bottom-left',
      timeout: 10000,
      customFields : { message }
    });
  }
}

function notifyMeChromeNotification (title,options,handleClick= ()=>{}) {
  if (!('Notification' in window)) {
    alert('This browser does not support system notifications')
  } else if (Notification.permission === 'granted') {
    showNotification(title,options,handleClick)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        showNotification(title.senderName,options,handleClick)
      }
    })
  }
}

function showNotification (title,options,handleClick) {
  var n = new Notification(title, options)
  n.onclick = handleClick
  setTimeout(n.close.bind(n), 2000)
}

export default {
  onSocketMessage,
  notifyMe
}
