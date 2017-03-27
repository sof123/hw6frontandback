import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_KEYWORD_SUCESS,
              GET_DOB_SUCCESS, UPDATE_DOB_SUCESS, UPDATE_PASSWORD_SUCCESS} from '../actions'

const updateHeadlineAction = (headline) => (dispatch) =>{

  return resource('PUT', 'headline', { headline })
    .then(r =>
      dispatch({
        type: 'updateHeadlineToDo',
        payload: r
      })
    )
}

const logoutAction = () => (dispatch) => resource('PUT', 'logout').then(r =>
  (dispatch({
    type: 'logoutToDo',
    payload: "OK"
})))



const loginAction = (username, password) => (dispatch) => {
  const loginObject = {username: username, password: password}
  return  resource('POST', 'login', loginObject).then(r =>
  (dispatch({
    type: 'loginToDo',
    payload: r
  })))
}

const registerAction = (user) => (dispatch) => {
const  registerObj = {
    username: user.username.value,
    email: user.email.value,
    dob: user.dob.value,
    zipcode: user.zip.value,
    password: user.password.value
  }
  return  resource('POST', 'register', registerObj).then(r =>
  (dispatch({
    type: 'registerToDo',
    payload: r
  })))
}

export const bindFetchFeedToDispatch = (dispatch) => () => {
  return resource('GET', 'articles')
    .then(json =>{
      dispatch({
        type: FETCH_FEED_SUCCESS,
        payload: json
      })
    })
}

export const getZipAction = (dispatch) => (username) => {
  return resource('GET', `zipcode/${username}`)
    .then(json =>
      dispatch({
        type: GET_ZIP_SUCCESS,
        payload: json
      })
    )
}

export const getEmailAction = (dispatch) => () => {
  return resource('GET', 'email')
    .then(json =>
      dispatch({
        type: GET_EMAIL_SUCCESS,
        payload: json
      })
    )
}

export const getDobAction = (dispatch) => () =>{
  return resource('GET', 'dob').then(r =>
    {
      return (dispatch({
      type: GET_DOB_SUCCESS,
      payload: r
  }))})
}


export const bindFollowToDispatch = (dispatch) => (username) => {

  dispatch({ type: CLEAR_FOLLOW_ERROR })


  return  resource('PUT', `following/${username}`)
    .then(json =>
      dispatch({
        type: FOLLOW_SUCCESS,
        payload: json
      })
    )
    .catch(err =>
      dispatch({
        type: FOLLOW_FAILURE,
        error: true,
        payload: {
          followError: err.message
        }
      })
    )
}

export const updateZipAction = (newZip) => (dispatch) =>{

  return resource('PUT', 'zipcode', {
      zipcode: newZip.value
  }).then(r =>
    {
      return (dispatch({
      type: UPDATE_ZIP_SUCCESS,
      payload: r
  }))})
}

export const updateEmailAction = (newEmail) => (dispatch) =>{
  return resource('PUT', 'email', {
      email: newEmail.value
  }).then(r =>
    {
      return (dispatch({
      type: UPDATE_EMAIL_SUCCESS,
      payload: r
  }))})
}

export const updatePasswordAction = (newPassword) => (dispatch) =>{
  return resource('PUT', 'password', {
      password: newPassword.value
  }).then(r =>
    {
      return (dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: r
  }))})
}

export const bindUnfollowToDispatch = (dispatch) => (username) => {
  resource('DELETE', `following/${username}`).then(json => {
    dispatch({
      type: UNFOLLOW_SUCCESS,
      payload: json
    })
  })
}



const getMyFollowingAction = (dispatch) => () => {
  resource('GET', 'following').then(json => {
    dispatch({
      type: RECEIVE_FOLLOWING,
      payload: json
    })
  })
}

export {updateHeadlineAction, logoutAction, loginAction, registerAction, getMyFollowingAction}
