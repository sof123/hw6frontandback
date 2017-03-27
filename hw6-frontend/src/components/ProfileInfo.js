import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmailAction, getDobAction, getZipAction, updateZipAction, updateDobAction,
        updateEmailAction, updatePasswordAction} from '../actions/profileActions'

class ProfileInfo extends Component {

  componentWillMount() {
    this.props.getDob()
    this.props.getEmail()
    this.props.getZipcode(this.props.username)
  }

  render() {
    const dob = this.props.dob;
    const username = this.props.username;
    const email = this.props.email;
    const password = this.props.password;
    const zipcode = this.props.zipcode;
    const updateZip = this.props.updateZip;
    const updateEmail = this.props.updateEmail;
    const updateDob = this.props.updateDob;
    const updatePassword = this.props.updatePassword;

    let zipcodeValue;
    let emailValue;
    let dobValue;
    let passwordValue;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>E-mail</td>
              <td><input name="Email" id="emailInput" ref={(a)=>emailValue=a} type="email" />
                <font id=""> </font>
              </td>
              <td id="emailText"> {email} </td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td><input name="Dob" ref={(a)=>dobValue=a} />
                <font id="DOBText"> </font>
              </td>
              <td> {dob} </td>
            </tr>
            <tr>
              <td>Zipcode</td>
              <td><input ref={(a)=>zipcodeValue=a} name="Zipcode" id="zipcodeInput" type="number" />
                <font id=""> </font>
              </td>
              <td id="zipcodeText"> {zipcode} </td>
            </tr>
            <tr>
              <td>Change Password</td>
              <td><input  name="Password" id="passwordInput" ref={(a)=>passwordValue=a} type="password" />
                <font id=""> </font>
              </td>
              <td id="passwordText"> {password} </td>
            </tr>
            <tr>
              <input type="button" defaultValue="Update" id="updateReact"
                    onClick={() =>{updateZip(zipcodeValue);updateEmail(emailValue);updatePassword(passwordValue); }} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  state => ({
    username: state.username,
    dob: state.dob,
    email: state.email,
    zipcode: state.zipcode,
    password: state.password
  }),
  dispatch => ({
      getDob:  getDobAction(dispatch),
      getEmail: getEmailAction(dispatch),
      getZipcode: getZipAction(dispatch),
      updateZip: (newZip) => updateZipAction(newZip)(dispatch),
      updateDob: (newDob) => updateDobAction(newDob)(dispatch),
      updateEmail: (newEmail) => updateEmailAction(newEmail)(dispatch),
      updatePassword: (newPassword) => updatePasswordAction(newPassword)(dispatch),
  })
)(ProfileInfo)
