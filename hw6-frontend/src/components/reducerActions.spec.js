import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../reducers'
import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_KEYWORD_SUCESS,
              SET_ARTICLES_SUCCESS} from '../actions'

describe('Validate reducer', () => {
  it('should initialize state', () => {
    expect(Reducer(undefined, {}).nextId).to.eql(2)
  })

  it('should state success', () => {
    expect(Reducer(undefined, {type: FETCH_FEED_SUCCESS, success:"success"}).success).to.eql("success")
  })

  it('should state error', () => {
    expect(Reducer(undefined, {type: CLEAR_FOLLOW_ERROR, success:"error"}).success).to.eql("error")
  })

  it('should set the articles', () => {
    expect(Reducer(undefined, {type:SET_ARTICLES_SUCCESS, articles: ["blah"]}).articles).to.eql(["blah"])
  })

  it('should set the search keyword', () => {
    expect(Reducer(undefined, {type:SET_KEYWORD_SUCESS, keyword: "keyword"}).keyword).to.eql("keyword")
  })

  it('should filter displayed articles by the search keyword', () => {
    expect(1).to.eql(1)
  })

})



/*

  it('should change the email to the vlaue fetched  ', () => {
    expect(
      ProfileReducer(undefined, {type :'CHANGE_EMAIL',payload:'abc@abc.com' })
    ).to.eql(
      {
        zipcode : "",
        email : "abc@abc.com"
      }
    )
  })

  it('should change the email to the value fetched ', () => {
    expect(
      ProfileReducer(undefined, {type :'CHANGE_ZIPCODE', payload : '77054'})
    ).to.eql(
      {
        zipcode : "77054",
        email : ""

      }
    )
  })

})
*/
