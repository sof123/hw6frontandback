export const RECEIVE_FOLLOWING = 'app/RECEIVE_FOLLOWING'
export const UNFOLLOW_SUCCESS = 'app/UNFOLLOW_SUCCESS'
export const FOLLOW_SUCCESS = 'app/FOLLOW_SUCCESS'
export const CLEAR_FOLLOW_ERROR = "app/CLEAR_FOLLOW_ERROR"
export const FOLLOW_FAILURE = "app/FOLLOW_FAILURE"
export const FETCH_FEED_SUCCESS = "app/FETCH_FEED_SUCCESS"
export const CREATE_ARTICLE_SUCCESS = "app/CREATE_ARTICLE_SUCCESS"
export const UPDATE_ZIP_SUCCESS = "app/UPDATE_ZIP_SUCCESS"
export const UPDATE_EMAIL_SUCCESS = "app/UPDATE_EMAIL_SUCCESS"
export const UPDATE_DOB_SUCESS = "app/UPDATE_DOB_SUCESS"
export const GET_ZIP_SUCCESS = "app/GET_ZIP_SUCCESS"
export const GET_EMAIL_SUCCESS = "app/GET_EMAIL_SUCCESS"
export const SET_ARTICLES_SUCCESS = "app/SET_ARTICLES_SUCCESS"
export const GET_DOB_SUCCESS = "app/GET_DOB_SUCCESS"
export const ADD_COMMENT_SUCCESS = "app/ADD_COMMENT_SUCCESS"
export const EDIT_COMMENT_SUCCESS = "app/EDIT_COMMENT_SUCCESS"
export const EDIT_ARTICLE_SUCCESS = "app/EDIT_ARTICLE_SUCCESS"
export const UPDATE_PASSWORD_SUCCESS = "app/UPDATE_PASSWORD_SUCCESS"


export const url = 'https://webdev-dummy.herokuapp.com'


function isJSONResponse(r) {
  return r.headers.get('Content-Type').indexOf('json') > 0
}

const resource = (method, endpoint, payload) => {
  const options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        if (isJSONResponse(r)){
          return r.json().then(json => json)
        }
        else {
          return r.text().then(text => text)
        }
      } else {
        //to deebug
        if (isJSONResponse(r)) {
          return r.json().then(
            json => {throw new Error(json.error)}
          )
        }
      }
    })
}

export default resource
