

export function getLastMessageId(chatFeed, id) {
  let lastMessageId = ''
  for (let i = chatFeed.length - 1; i >= 0; i -= 1) {
    if (__DEBUG__) console.log('In @getLastMessageId ', chatFeed[i], parseInt(chatFeed[i].sender, 10), parseInt(id, 10))
    if (parseInt(chatFeed[i].sender, 10) !== parseInt(id, 10)) {
      lastMessageId = chatFeed[i].messageId
      break
    }
  }
  return lastMessageId
}

export function getLastUnReadMessageId(chatFeed, id) {
  let lastMessageId = ''
  for (let i = 0; i < chatFeed.length; i -= 1) {
    if (__DEBUG__) console.log('In @getLastMessageId ', chatFeed[i], parseInt(chatFeed[i].sender, 10), parseInt(id, 10))
    if (parseInt(chatFeed[i].sender, 10) !== parseInt(id, 10)) {
      lastMessageId = chatFeed[i].messageId
      break
    }
  }
  return lastMessageId
}

export function getMessageIndex(chatFeed, messageId) {
  if (chatFeed) {
    for (let i = chatFeed.length - 1; i >= 0; i--) {
      if (parseInt(chatFeed[i].messageId, 10) === parseInt(messageId, 10)) {
        return i
      }
    }
  }
  return -1
}

export default {
  getLastMessageId,
  getMessageIndex
}
