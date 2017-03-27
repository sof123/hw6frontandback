import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindFetchFeedToDispatch} from '../actions/profileActions'
var articlesRendered = 0;
exports.articlesRendered = articlesRendered

class Avatar extends Component {

  componentWillMount() {
    this.props.getAvatar()
  }

  render() {
    const avatar = this.props.avatar

    return (
      <div>
        <h1>Avatar</h1>


      </div>
    )
  }
}

export default connect(
  state => ({
    avatar: state.avatar
  }),
  dispatch => ({
    getAvatar: getAvatarAction(dispatch)
  })
)(Avatar)
