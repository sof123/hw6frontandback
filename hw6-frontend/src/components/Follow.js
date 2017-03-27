import React, {Component} from 'react'
import  {connect} from 'react-redux'
import {bindFollowToDispatch} from '../actions/profileActions'


class Follow extends Component {

  storeInputRef(input) {
    this.input = input
  }

  render() {
    const { followError, follow } = this.props
    return (
      <div>
        {followError && (
          <p className="error">{followError}</p>
        )}
        <input id="followInput" ref={this.storeInputRef.bind(this)} type="text"/>
        <button id="followButton"
          onClick={() => follow(this.input.value)}
          type="button"
        >Follow user</button>
      </div>
    )
  }
}


export default connect(
  state => ({
    followError: state.followError
  }),
  dispatch => ({
    follow: bindFollowToDispatch(dispatch)
  })
)(Follow)
