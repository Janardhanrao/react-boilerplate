import { API_FETCHING, API_SUCCESS, API_FAILED, API_COMPLETED } from 'constants/AppConstants'

/**
* API Status Methods
*/

export function isAPISuccess (...args) {
  const status = true
  return Array.from(args).reduce((returnStatus, item) => (returnStatus && (parseInt(item) === API_SUCCESS)), status)
}

export function isAPIFailed (...args) {
  const status = true
  return Array.from(args).reduce((returnStatus, item) => returnStatus && (parseInt(item) === API_FAILED), status)
}

/**
  Takes only network call status of multiple calls and
  returns true if any one of them is in loading condition
*/

export function isAPIFetching (...args) {
  const status = false
  return Array.from(args).reduce((returnStatus, item) => returnStatus || (parseInt(item, 10) === API_FETCHING), status)
}

export function getLoadingProgressStatus (...args) {
  if (isAPIFailed(args)) {
    return API_FAILED
  }
  return API_SUCCESS
}

export function getLoadingStatus (...args) {
  if (isAPISuccess(...args)) {
    return API_SUCCESS
  } else if (isAPIFailed(...args)) {
    return API_FAILED
  } else if (isAPIFetching(...args)) {
    return API_FETCHING
  }
  return API_COMPLETED
}

export default {
  getLoadingProgressStatus,
  getLoadingStatus,
  isAPIFailed,
  isAPISuccess,
  isAPIFetching
}
