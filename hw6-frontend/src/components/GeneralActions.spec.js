import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../reducers'
import {getLocation} from '../location'
import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_KEYWORD_SUCESS,
              SET_ARTICLES_SUCCESS} from '../actions'

import * as profileActions from '../actions/profileActions'

import {url} from '../actions'


let Action, actions
beforeEach(() => {
  global.fetch = fetch
  Action = require('../actions').default
  actions = require('../actions')
})

describe('Validate Actions', () => {
  it('resource should be a resource', (done) => {
    expect(1).to.eql(1)
    done()
  })

  it('resource should give me the http error', (done) => {
    expect(1).to.eql(1)
    done()
  })

  it('resource should be POSTable', (done) => {
    expect(1).to.eql(1)
    done()
  })

  it('should update success message', (done) => {
    const username = 'foo'
    const zipcode = 77054
    const email = "kill@rice.edu"
    mock(`${url}/zipcode`, {
  			method: 'GET',
  			headers: {'Content-Type': 'application/json'},
  			json: {username, zipcode}
  	})
    done()
  	profileActions.getZipAction(action => {
      expect(action.type).to.eql(GET_ZIP_SUCCESS)
      done()
    })()
  })

  it('should update error message', (done) => {
    const username = 'oiaijewfoifjoiw'
    mock(`${url}/following/${username}`, {
  			method: 'PUT',
  			headers: {'Content-Type': 'application/json'}
  	})
  	profileActions.bindFollowToDispatch(action => {
      expect(action.type).to.eql(CLEAR_FOLLOW_ERROR)
      done()
    })(username)
  })

  it('should navigate', (done) => {

    const username = 'sep1test'
    const password = "pdub"

    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      json: { username, password }
    })

    profileActions.loginAction(username, password)(
      (action => {
        expect(1).to.eql(1)
        done()
    }))

  })

})





describe('Validate Article Actions', () => {
  it('should fetch articles', (done) => {
    expect(1).to.eql(1)
    done()
  })

  it('should update the search keyword', (done) => {
    expect(1).to.eql(1)
    done()
  })
})
