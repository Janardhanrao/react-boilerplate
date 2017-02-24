import {genericWebAPICall} from 'utils/AppAPI'
import {onSocketMessage} from 'utils/AppActions'
var socket = require('socket.io-client')(AppConstants.SOCKET_BASE_URL)

export function emit (event, object) {
  socket.emit(event, object)
}

export function on (event, callback) {
  socket.on(event, callback)
}

export function getSocketEvent () {
  genericWebAPICall(
    'courses/getEmitEventNameAPI/v1/',
    {},
    function (response) {
      socket.on(response.eventName, function (message) {
        console.log('In Socket callback ', message)
        onSocketMessage(JSON.parse(message))
      })
    }.bind(this),
    function (response) {
      console.log('response', response)
    }.bind(this)
  )
}

export default {
  emit,
  on,
  getSocketEvent
}
