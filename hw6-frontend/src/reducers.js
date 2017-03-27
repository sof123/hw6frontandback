import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_ARTICLES_SUCCESS,
              SET_KEYWORD_SUCESS, GET_DOB_SUCCESS, UPDATE_DOB_SUCESS, ADD_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS, EDIT_ARTICLE_SUCCESS,
            UPDATE_PASSWORD_SUCCESS} from './actions'

export const Reducer = (state =  {
	nextId: 2,
	email: "",
	headline: "",
	following: [],
  username: "",
	articles: [],
	success: "",
	keyword: "",
	zipcode: 0,
	location: "Landing.js",
	posts: [],
  password: "",
	dob: "",
	todoItems: [
	    {id: 0, text: "This is an item", done: false, displayArticles: false},
	    {id: 1, text: "Another item", done: false, displayArticles: false}
	],
	visibilityFilter: 'SHOW_ALL'
}, action) => {
	switch(action.type) {
		case 'loginToDo':
			return { ...state, nextId: state.nextId + 1, location: "Main.js",
					username: action.payload.username
			}

    case 'registerToDo':
  		return { ...state, nextId: state.nextId + 1, location: "Landing.js",
            username: action.payload.username,
  					email: action.payload.email,
            zipcode: action.payload.zipcode,
            dob: action.payload.dob
  		      }
		case 'logoutToDo':
			//clear state
			return { ...state, nextId: state.nextId + 1, location: "Landing.js",
					following: [], headline: "", email: "", articles: [], zipcode: 11111,
					posts: []
			}
		case 'goToProfileToDo':
			return { ...state, nextId: state.nextId + 1, location: "Profile.js",
					todoItems: [ ...state.todoItems,
						{id:state.nextId, text: action.text, done: false}]
			}
		case 'updateHeadlineToDo':
			return { ...state, nextId: state.nextId + 1, headline: action.payload.headline, location: "Main.js", posts: [...state.posts, action.text],
					todoItems: [ ...state.todoItems,
						{id:state.nextId, done: false,}]
			}
		case 'getArticlesToDo':
			return { ...state, nextId: state.nextId + 1, location: "Main.js",
					todoItems: [ ...state.todoItems,
						{id:state.nextId, text: action.text, done: false, displayArticles:true}]
		}
		case 'goToLandingToDo':
			return { ...state, nextId: state.nextId + 1, location: "Landing.js",
					todoItems: [ ...state.todoItems,
						{id:state.nextId, text: action.text, done: false}]
			}
		case 'goToMainToDo':
			return { ...state, nextId: state.nextId + 1, location: "Main.js",
					todoItems: [ ...state.todoItems,
						{id:state.nextId, text: action.text, done: false}]
			}
		case FETCH_FEED_SUCCESS:
      if (!action.payload)
      {
        action.payload = {articles: {}}
      }
			return {
				...state,
				articles: action.payload.articles,
				success: "success"
			}
		case SET_ARTICLES_SUCCESS:
			return {
				...state,
        articles: action.articles,
				success: "success",
		 }
    case SET_KEYWORD_SUCESS:
 			return {
 				...state,
        keyword: action.keyword,
 				success: "success",
 		 }
		case UPDATE_ZIP_SUCCESS:
			return {
				...state,
				zipcode: action.payload.zipcode,
				success: "success"
			}
		case UPDATE_EMAIL_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				success: "success"
			}
    case UPDATE_DOB_SUCESS:
  		return {
  			...state,
  			dob: action.payload.dob,
  			success: "success"
  		}
		case CLEAR_FOLLOW_ERROR:
			return {
				...state,
				followError: null,
				success: "error"
			}
		case GET_DOB_SUCCESS:
		return {
			...state,
			dob: action.payload.dob,
			success:"success"
		}

    case ADD_COMMENT_SUCCESS:
  		return {
  			...state,
  			articles: action.payload.articles,
  			success:"success"
  		}

    case EDIT_COMMENT_SUCCESS:
    		return {
    			...state,
    			articles: action.payload.articles,
    			success:"success"
    		}

    case EDIT_ARTICLE_SUCCESS:
        		return {
        			...state,
        			articles: action.payload.articles,
        			success:"success"
        		}

    case RECEIVE_FOLLOWING:
  			return {
  				...state,
  				following: action.payload.following
  			}
    case UPDATE_PASSWORD_SUCCESS:
        return {
          ...state,
          following: action.payload.following,
          password: action.payload.status
        }


		default:
			return {
				...state,
				nextId: state.nextId + 1,
				...action.payload,
			}
	}

}

function removedArray(arr, element)
{
  var index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}

export default Reducer
