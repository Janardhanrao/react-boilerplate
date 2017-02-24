/* @flow */
import moment from 'moment'
import AppConstants from 'constants/AppConstants'

export function addEventListener(event,callback,item){

  if(item) {
    item.addEventListener(event, callback, true)
    return
  }

  if(window.attachEvent) {
    window.attachEvent(event, callback);
  }
  else if(window.addEventListener) {
    window.addEventListener(event, callback, true);
  }
  else {
      //The browser does not support Javascript event binding
  }  
}

export function removeEventListener(event,callback,item){
  if(item) {
    item.removeEventListener(event, callback, true)
    return
  }
  if(window.detachEvent) {
      window.detachEvent(event,callback);
  }
  else if(window.removeEventListener) {
      window.removeEventListener(event,callback);
  }
  else {
      //The browser does not support Javascript event binding
  }
}

export function parseJSON(data) {
  let parsedJson
  try {
    parsedJson = JSON.parse(data)
  } catch (e) {
    parsedJson = {}
  }
  return parsedJson
}


export function zeroFill (num, size) {
  if (num < 0) {
    return num
  }
  var s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

export function convertMinsToFormatedDate (minutes, format = 'HH:MM:SS') {
  let formatedDate = moment.duration(minutes, 'minutes')
  let days = moment.duration().days() <= 0 ? '' : moment.duration().days() + ' Ds'
  let hours = moment.duration().hours() <= 0 ? '' : moment.duration().hours() + ' Hr'
  let mins = moment.duration().minutes() <= 0 ? '' : moment.duration().minutes() + ' Mins'
  if (days === '' && hours === '') {
    mins = '0 Mins'
  }
  return days + ' ' + hours + ' ' + mins
}

export function getTextFromDate (date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  if (hour >= 21 || hour < 5)
    return 'Hello'
  else if (hour == 12 && minute == 0)
    return 'Good Morning'
  else if (hour >= 5 && hour < 12)
    return 'Good Morning'
  else if (hour == 12 && minute > 0)
    return 'Good Afternoon'
  else if (hour > 12 && hour < 17)
    return 'Good Afternoon'
  else if (hour == 17 && minute == 0)
    return 'Good Afternoon'
  else if (hour == 17 && minute > 0)
    return 'Good Evening'
  else if (hour > 17 && hour < 21)
    return 'Good Evening'
}

export function getObjectByKey (objectList, keyLabel, keyValue) {
  for (var i = 0; i < objectList.length; i++) {
    if (objectList[i][keyLabel] === keyValue) {
      return objectList[i]
    }
  }
  return -1
}

export function getFormatedDateTime (date) {
  return moment(date, 'MMM DD,YYYY at HH:mmA')
}

export function getStringFormatedDateTime (date) {
  return moment(date).format('MMM DD,YYYY at HH:mmA')
}

export function objectSize (obj) {
  var size = 0, key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}


export function setCookie (name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  }
  document.cookie = name + '=' + value + ';' + expires
}

export function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

export function getCookie (name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  return (parts.length === 2) ? parts.pop().split(';').shift() : ''
}

export function deleteCookie (name) {
  setCookie(name, '', -1)
}

export function sortArrayOfObjectsByKey (inputArray, Key) {
  return inputArray.sort(
    (obj1, obj2) => parseFloat(obj1[Key]) - parseFloat(obj2[Key])
  )
}

export function generateOptionsForReactSelect (list, label, value) {
  var options = []
  options = list.map(function (item, index) {
    return {
      label: item[label],
      value: item[value]
    }
  })
  return options
}

export function prepareOptionsForReactSelect (object, defaultValue, defaultLabel) {
  let defaultOption = [{'value': defaultValue, 'label': defaultLabel}]
  let options = []
  for (let key in object) {
    options.push({'value': key, 'label': object[key]})
  }
  sortArrayOfObjectsByValue(options, 'label')
  return defaultOption.concat(options)
}

export function prepareOptionsForReactSelectForArray (array) {
  let options = array.map(function (element, index) {
    return ({
      'value': element,
      'label': element
    })
  })
  return options
}

export function prepareIntegerOptionsForReactSelect (start, end, defaultValue, defaultLabel) {
  let options = []
  let defaultOption = [{'value': defaultValue, 'label': defaultLabel}]
  for (let i = start; i <= end; i++) {
    options.push({'value': i, 'label': i})
  }
  return defaultOption.concat(options)
}

export function getAccessToken () {
  return getCookie('42c325-70k32')
}

function compare (key, type, a, b) {
  var key1 = a[key]
  var key2 = b[key]

  if (type === 'string') {
    key1 = a[key].toLowerCase()
    key2 = b[key].toLowerCase()
  }

  if (key1 < key2) {
    return -1
  } else if (key1 > key2) {
    return 1
  } else {
    return 0
  }
}

export function sortArrayOfObjectsByValue (inputArray, key) {
  // Use this when object key's value is number
  return inputArray.sort(compare.bind(null, key, typeof inputArray[0][key]))
}


/**
* API Status Methods
*/

export function isAPISuccess (status) {
  return status === AppConstants.API_SUCCESS
}

export function isAPIFailed (status) {
  return status === AppConstants.API_FAILED
}

export function isAPIFetching (status) {
  return status === AppConstants.API_FETCHING
}

export default {
  convertMinsToFormatedDate,
  convertQuestionToPoll,
  getTextFromDate,
  setCookie,
  getCookie,
  getObjectByKey,
  getOptionsListFromString,
  deleteCookie,
  sortArrayOfObjectsByKey,
  sortArrayOfObjectsByValue,
  shuffle,
  setHeightsOfSets,
  prepareOptionsForReactSelect,
  prepareIntegerOptionsForReactSelect,
  prepareButtonsForButtonGroup,
  generateOptionsForReactSelect,
  getCurrentScreenSize,
  getAccessToken,
  getFormatedDateTime,
  getMaterialIconByName,
  goToNextIncompleteSet,
  objectSize,
  showError,
  hideError,
  getContentTypes,
  getInputTypeForQuestionType,
  getToolbarItemsForOptionPreview,
  getIconClassName,
  getDisplayNameForQuestionType,
  getQuestionTypeContextMenuItmes,
  getMultimediaContextMenuItems,
  getPreviewTypeContextMenuItems,
  getToolbarItemsForQuestionPreview,
  generateRouteForNotifications,
  isAPIFetching,
  isAPISuccess,
  isAPIFailed,
  zeroFill
}
