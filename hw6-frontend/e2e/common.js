import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'tester',
    password: 'ppp'
}

exports.register = () =>
{
  sleep(500)
  .then(findId('accountNameId').clear())
  .then(findId('passwordRegisterId').clear())
  .then(findId('accountNameId').sendKeys('tester'))
  .then(findId('emailRegisterId').sendKeys("test@rice.edu"))
  .then(findId('phoneRegisterId').sendKeys("5555555555aa"))
  .then(findId('dobRegisterId').sendKeys("04-12-1995"))
   .then(findId('zipcodeRegisterId').sendKeys("55555"))
   .then(findId('passwordRegisterId').sendKeys("ppp"))
   .then(findId('passwordConfirmationRegisterId').sendKeys("ppp"))
   .then(findId('registerId').click() )
   .then(sleep(2000))
}

exports.login = () =>
{
    sleep(500)
    .then(findId('username').clear())
    .then(findId('password').clear())
    .then(findId('username').sendKeys(exports.creds.username))
    .then(findId('password').sendKeys(exports.creds.password))
    .then(findId('login').click() )
    .then(sleep(2000))
}

exports.logout = () =>
    sleep(500)
    .then(findId('logout').click())
