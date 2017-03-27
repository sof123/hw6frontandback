import resource, {CREATE_ARTICLE_SUCCESS, ADD_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS, EDIT_ARTICLE_SUCCESS} from '../actions'

export const bindCreateArticleToDispatch = (dispatch) => (articleText) => {
  resource('POST', 'article', {text:articleText})
    .then(json =>
      dispatch({
        type: CREATE_ARTICLE_SUCCESS,
        payload: json
      })
    )
}

export const addCommentAction = (comment, id) => (dispatch) =>{

  return resource('PUT', `articles/${id}`, {text:comment, commentId: "-1"})
    .then(r =>
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: r
      })
    )
}

export const editCommentAction = (comment, id, commentIndex) => (dispatch) => {

  return resource('PUT', `articles/${id}`, {text:comment, commentId: commentIndex.toString()})
    .then(r =>
      dispatch({
        type: EDIT_COMMENT_SUCCESS,
        payload: r
      })
    )
}

export const editArticleAction = (newText, id) => (dispatch) => {

  return resource('PUT', `articles/${id}`, {text:newText})
    .then(r =>
      dispatch({
        type: EDIT_ARTICLE_SUCCESS,
        payload: r
      })
    )
}
