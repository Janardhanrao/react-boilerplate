// import * as constants from 'constants/AppConstants';
import * as auth from './auth'
import * as moment from 'moment'
import {API_FETCHING, API_SUCCESS, API_FAILED} from 'constants/AppConstants'
// export function genericWebAPICall (url, requestObject, onSuccess, onFailure, type = 'POST', setLoadingStatus,cache=true) {
//   var cookie = auth.getCookie('access_token')
//   var startTime
//   if(type == 'POST'){
//     const formattedrequestObject = JSON.stringify(JSON.stringify(requestObject));
//     const dataRequestObject = JSON.stringify({'data':formattedrequestObject, 'clientKeyDetailsId':1});
//     fetch(AppConstants.BASE_URL+url,
//     {
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization' : "Bearer " + cookie
//         },
//         method: "POST",
//         body: dataRequestObject
//     }).then(function(res){
//         // console.log('res.headers',res.headers.get('Status'))
//         // if(res.headers.get('Status' !== 200)) {
//         //   onFailure(response.json())
//         // } else {
//         return res.json();
//       })
//     .then((response) => {
//       console.log(response)
//       if(response.status=="NOT_OK"){
//         onFailure(response);
//       }else{
//         onSuccess(response);
//       }
//     })
//     .catch(function(res){
//       onFailure(res);
//       console.log(res)
//     })
//   }else if(type == 'GET'){
//     fetch(AppConstants.BASE_URL+url,
//     {
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization' : "Bearer " + cookie
//         },
//         method: "GET",
//     })
//     .then(function(res){return res.json();})
//     .then((response) => {
//       console.log(response)
//       if($.type(response) == 'string' || response.status=="NOT_OK"){
//         onFailure(response);
//       }else{
//         onSuccess(response);
//       }
//     })
//     .catch(function(res){
//       onFailure(res);
//       console.log(res)
//     })
//   }
// }

export function genericWebAPICall (url, requestObject, onSuccess, onFailure, type = 'POST', setLoadingStatus,cache=false,baseURL = AppConstants.BASE_URL ) {
    // auth.setCookie('access_token','0HZssB4SsfF7yPsdixIE5pQ8stlrqN', 20);
  var cookie = auth.getCookie('access_token')
  var startTime
  if (type == 'POST') {
    const formattedrequestObject = JSON.stringify(JSON.stringify(requestObject))
    const dataRequestObject = JSON.stringify({'data': formattedrequestObject, 'clientKeyDetailsId': 1})
    $.ajax({
      type: 'POST',
      url: baseURL + url,
      beforeSend: function (xhr) {
        setLoadingStatus && setLoadingStatus(API_FETCHING)
        if (AppConstants.IS_LAMBDA)
          {
          xhr.setRequestHeader('x-api-key', 'ce1JCgYMj53CLOm9OnpPL53JpsOVStSh3UKtWis2')
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + cookie)
        startTime = moment.default(new Date())
      },
      data: dataRequestObject,
      contentType: 'application/json; charset=UTF-8'
    })
        .done(
          function doneHandler (msg) {
            console.log('msg',msg)
            var endTime = moment.default(new Date())
            var duration = moment.duration(endTime.diff(startTime)).milliseconds()
            var status = 'success'
            if (msg && $.type(msg) == 'string') {
              try {
                msg = JSON.parse(msg)
              } catch (e) {

              } finally {

              }
            }
            if (msg && msg.status === 'NOT_OK') {
              if(cache){
                  var responseData = localStorage.getItem(url+dataRequestObject);
                  if(responseData){
                    setLoadingStatus && setLoadingStatus(API_SUCCESS)
                    onSuccess(JSON.parse(responseData));
                    return
                  }
              }
              onFailure(msg)
              status = 'failure'
              setLoadingStatus && setLoadingStatus(API_FAILED)
            } else {
              localStorage.setItem(url+dataRequestObject,JSON.stringify(msg));
              onSuccess(msg)
              status = 'success'
              setLoadingStatus && setLoadingStatus(API_SUCCESS)
            }
            // analytics.track(url, {
            //   duration : duration,
            //   status : status
            // });
          }
        )
        .fail(
          function failHandler (msg) {
            var endTime = moment.default(new Date())
            var duration = moment.duration(endTime.diff(startTime)).milliseconds()
            // analytics.track(url, {
            //   duration : duration,
            //   status : 'failure'
            // });
            onFailure(msg)
            if(cache){
                var responseData = localStorage.getItem(url+dataRequestObject);
                if(responseData){
                  setLoadingStatus && setLoadingStatus(API_SUCCESS)
                  onSuccess(JSON.parse(responseData));
                  return
                }
            }
            setLoadingStatus && setLoadingStatus(API_FAILED)
          }
        )
  } else if (type == 'GET') {
    $.ajax({
      type: 'GET',
      url: baseURL + url,
      beforeSend: function (xhr) {
        if (AppConstants.IS_LAMBDA)
          {
          xhr.setRequestHeader('x-api-key', 'ce1JCgYMj53CLOm9OnpPL53JpsOVStSh3UKtWis2')
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + cookie)
      },
      contentType: 'application/json; charset=UTF-8'
    })
        .done(
          function doneHandler (msg) {
            if ($.type(msg) == 'string') {
              msg = JSON.parse(msg)
            }
            if (msg.status === 'NOT_OK') {
              // alert(url);
              onFailure(msg)
            } else {
              onSuccess(msg)
            }
          }
        )
        .fail(onFailure)
  }
}
