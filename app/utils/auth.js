// var AppConstants = require('../constants/AppConstants');

module.exports = {

  login: function (username, pass, success, failure) {
    var data = {
      clientId: AppConstants.CLIENT_ID,
      clientSecret: AppConstants.CLIENT_SECRET,
      username: username,
      otp: pass
    }
    $.ajax({
      type: 'POST',
      url: AppConstants.BASE_URL + 'kfeedapp/getAccessTokenAndRefreshTokenAPI/v1/',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify({'data': JSON.stringify(JSON.stringify(data)), 'clientKeyDetailsId': 1}),
      beforeSend: function (xhr) {
        if (AppConstants.IS_LAMBDA)
      {
          xhr.setRequestHeader('x-api-key', 'ce1JCgYMj53CLOm9OnpPL53JpsOVStSh3UKtWis2')
        }
      }
    })
    .done(function (msg) {
      if ($.type(msg) == 'string') {
        msg = JSON.parse(msg)
      }
      console.log(msg)
      if (msg.status === 'NOT_OK') {
        failure(msg)
      } else {
        success(msg)
      }
    })
    .fail(function (msg) {
      failure(msg)
    })
  },
  loggedIn: function () {
    if (this.getCookie('access_token')) {
      return true }
    else { return false }
  },
  deleteCookie: function (name) {
    console.log(name)
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  },
  getCookie: function (name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length == 2)
      return parts.pop().split(';').shift()
    return ''
  },
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  logout: function () {
    console.log('logout')
    this.deleteCookie('access_token')
    this.deleteCookie('phone_number')
  },
  getToken: function () {
    return this.getCookie('access_token')
  }

}
