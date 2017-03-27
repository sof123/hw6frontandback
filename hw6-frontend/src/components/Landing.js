import React, { Component, PropTypes } from 'react'
import  {connect } from 'react-redux'
import {loginAction, registerAction} from '../actions/profileActions'

const user = {}

export const LandingItem = ({login, register}) =>{
  let AccountName
  let password
  const loginClicked = () =>{

    if (AccountName && AccountName.value && password && password.value){
      login(AccountName.value, password.value)
    }

  }
  const registerClicked = () =>{

    if (AccountName && AccountName.value && password && password.value){
      login(AccountName.value, password.value)
    }

  }

  document.body.style.backgroundColor = "#E6E6FA";


return (
      <div >
        <meta name="author" content="Simi Fagbemi" />
        Create a new account
        <br /><br />
        <form id="signIn" name="submitForm" method="" action="" onSubmit={register}>
          <table bgcolor="#e0ebeb" className="form">
            <tbody><tr>
                <td>Account Name</td>
                <td><input  id="accountNameId" name="AccountName" ref={(node)=> user.username = node}required /></td>
              </tr>
              <tr>
                <td>Display Name (Optional)</td>
                <td><input name="DisplayName" ref={(node)=> user.display = node}/></td>
              </tr>
              <tr>
                <td>E-mail Address</td>
                <td><input id="emailRegisterId" name="Email" type="email" ref={(node)=> user.email = node} required /></td>
              </tr>
              <tr>
                <td>Phone Number (format: 5555555555) </td>
                <td><input id="phoneRegisterId" name="PhoneNumber" required type="tel" pattern="\d{10}" ref={(node)=> user.phone = node} /></td>
              </tr>
              <tr>
                <td>Date of Birth (MM/DD/YYYY) </td>
                <td><input name="DOB" id="dobRegisterId" required ref={(node)=> user.dob = node} /></td>
              </tr>
              <tr>
                <td>Zipcode (format: 55555) </td>
                <td><input name="Zipcode" id="zipcodeRegisterId" type="number" pattern="\d{5}" required ref={(node)=> user.zip = node} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input name="Password" id="passwordRegisterId" required type="password" ref={(node)=> user.password = node} /></td>
              </tr>
              <tr>
                <td>Password Confirmation</td>
                <td><input name="PasswordConfirmation" id="passwordConfirmationRegisterId" type="password" required /></td>
              </tr>
              <tr><td colSpan={2}><input type="button" id="registerId" onClick= {() => register(user)} defaultValue="Submit form" /><br />
                  <input type="reset" defaultValue="Clear" /></td></tr>
            </tbody></table>
          <input type="hidden" name="timeStamp" />
        </form>
        <br /><br />
        Already a user? Login
        <br /><br />
        <table textAlign="center">
          <tbody><tr>
              <td>Account Name</td>
              <td>  <input id="username" name="AccountName" ref={(node)=> AccountName = node} required />
                <span id="AccountNameText"></span>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input id="password" name="Password" ref={(node)=> password = node} required type="password" />
                <span id="PasswordText"></span>
              </td>
            </tr>
            <tr><td colSpan={2}><input type="button" defaultValue="Login" id="login" onClick={loginClicked} /><br />
              </td></tr>
          </tbody></table>
      </div>
)
}

//dispatching  method to reducer
export default connect(null, (dispatch, ownProps) => {
        return {
            login: (username, password) => loginAction(username, password)(dispatch),
            register: (user) => registerAction(user)(dispatch)
        }
    })(LandingItem)
