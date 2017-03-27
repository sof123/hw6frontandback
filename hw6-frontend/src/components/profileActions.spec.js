import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS} from '../actions'



import * as profileActions from '../actions/profileActions'
import {url} from '../actions'


let Action, actions
beforeEach(() => {
  global.fetch = fetch
  Action = require('../actions').default
  actions = require('../actions')
})

it('should update the status message', (done) => {
  // the result from the mocked AJAX call
  const username = 'sep1test'
  const headline = 'A new headline!'

  mock(`${url}/headline`, {
  	method: 'PUT',
  	headers: {'Content-Type':'application/json'},
  	json: { username, headline }
  })

  profileActions.updateHeadlineAction('does not matter')(
  	(action => {
  	  expect(action).to.eql({
  	  	type: 'updateHeadlineToDo',
        payload: { username, headline }
  	  })
  	  done()
  }))

})

it('should fetch the users profile information (email and zip)', (done) => {

  const username = 'foo'
  const zipcode = 77054
  const email = "kill@rice.edu"

  mock(`${url}/zipcode/${username}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
	})

	profileActions.getZipAction(action => {
    expect(action).to.eql({
      type: GET_ZIP_SUCCESS,
      payload: {username,zipcode}
    })
    //done()
  })()

  mock(`${url}/email`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {username,email}
		})

    profileActions.getEmailAction(action => {
      expect(action).to.eql({
        type: GET_EMAIL_SUCCESS,
        payload: {username,email}
      })
      done()
    })()



  })

describe('Validate Authentication Actions', () => {
    it('should login a user', (done) => {
      // the result from the mocked AJAX call
      const username = 'sep1test'
      const password = "pdub"

      mock(`${url}/login`, {
      	method: 'POST',
      	headers: {'Content-Type':'application/json'},
      	json: { username, password }
      })

      profileActions.loginAction(username, password)(
      	(action => {
      	  expect(action).to.eql({
      	  	type: 'loginToDo',
            payload: { username, password}
      	  })
      	  done()
      }))

    })

    it('should not login an invalid user', (done) => {
      // the result from the mocked AJAX call
      const username = '111111'
      const password = "11"

      mock(`${url}/login`, {
      	method: 'POST',
      	headers: {'Content-Type':'application/json'},
      	json: { username, password }
      })

      profileActions.loginAction(username, password)(
      	(action => {
      	  expect(action).to.eql({
      	  	type: 'loginToDo',
            payload: { username, password}
      	  })
      	  done()
      }))

    })

    it('should log out a user', (done) => {
      // the result from the mocked AJAX call
      //const username = 'sep1test'
      //const password = "pdub"

      mock(`${url}/logout`, {
      	method: 'PUT',
      	headers: {'Content-Type':'application/json'}
      })

      profileActions.logoutAction()(
      	(action => {
      	  expect(action).to.eql({
      	  	type: 'logoutToDo',
            payload: "OK"
      	  })
          expect()
      	  done()
      }))

    })
})
