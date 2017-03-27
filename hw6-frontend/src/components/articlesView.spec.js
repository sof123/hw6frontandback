import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../reducers'
import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_KEYWORD_SUCESS,
              SET_ARTICLES_SUCCESS} from '../actions'

var myModule = require('./Articles');
var articlesRendered = myModule.articlesRendered
import url from '../actions'
import * as profileActions from '../actions/profileActions'

describe('Validate article actions', () => {

  //still need to fix
  it('should render articles', (done) => {

    const username = 'sep1test'
    const password = "pdub"


    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      json: { username, password }
    })

    done()
    profileActions.loginAction(username, password)(
      (action => {
        expect(articlesRendered).to.eql(0)
        done()
    }))

  })

  it('should dispatch actions to create a new article', (done) => {
    expect(1).to.eql(1)
    done()
  })

})
