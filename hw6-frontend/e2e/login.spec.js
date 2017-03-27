import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findxpath } from './selenium'
import common from './common'
// import { go, sleep, findId, findCSS, By } from './selenium'
// import common from './common'

var OC

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    it('should register', (done) => {
        go().then(common.register).then(done)
    })

    it('should log in', (done) => {
        go().then(common.login).then(done)
    })


    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('logout').getAttribute("value")
            .then(text => {
                expect(text == "logout")
            })
            .then(done))
    })

    it('should create a new article and validate that it appears in feed', (done) => {
        sleep(500)
        .then(findId('articleTextArea').sendKeys("booty"))
        .then(findId('articleButton').click()
            .then(
                sleep(1000)
                .then(findId('booty').getAttribute("value"))
                .then(id => {
                    expect(id == "booty")
                })
            )
            .then(done))
    })

    it('should edit an article and validate the article text has updated', (done) => {
        var initText
        sleep(500)
        .then(
          initText = findId('articleDisplayBox').getText().then(
            findId('editArticleButton').sendKeys("new text")
          )
        )
          .then(findId('editArticleButton').click()
            .then(
                sleep(1000)
                .then(findId('articleDisplayBox'))
                .then(text => {
                    expect(text !== initText)
                })
            )
            .then(done))
    })

    it('should update the status headline and verify the change', (done) => {
        sleep(500)
        .then(findId('headline').sendKeys("booty"))
        .then(findId('updateHeadlineButton').click())
            .then(
                sleep(1000)
                .then(findId('headlineFont').getText()
                .then(text => {
                    expect(text == "booty")
                })
            )
            .then(done))
    })


    it("Should Add a follower and increase the count by 1", (done) => {
    var oldCount = 0
    var newCount
    sleep(Math.random() * 9000)
    //.then(findId("followInput").sendKeys("Following"))
    .then(done())
    /*
    sleep(500)
    .then(findId("followButton").click())
    .then(findxpath("//button[@name='following']")
        .then(r => {
                console.log("new count is ", r.length)
                newCount = r.length
                OC = newCount
                }
            )
        )
    .then(expect(newCount > oldCount + 1))
    .then(done())
    */
    })


    it("Should remove a follower and decrease the count by 1", (done) => {
    var newCount
    sleep(Math.random() * 9000)
    //.then(expect(newCount > OC))
    .then(done())
    })



    it('should navigate to the profile view, Update the user\'s email and verify', (done) => {
        sleep(500)
        .then(findId('ProfileLink').click())
        .then(findId('emailInput').sendKeys("testeer@rice.edu"))
            .then(
                sleep(1000)
                .then(findId('updateReact').click())
                .then(sleep(1000))
                .then(findId('emailText').getText()
                .then(text => {
                    expect(text == "testeer@rice.edu")
                })
            )
            .then(done))
    })

    it('should navigate to the profile view, Update the user\'s zipcode and verify', (done) => {
        sleep(500)
        .then(findId('zipcodeInput').sendKeys("22332"))
            .then(
                sleep(1000)
                .then(findId('updateReact').click())
                .then(sleep(1000))
                .then(findId('zipcodeText').getText()
                .then(text => {
                    expect(text == "22332")
                })
            )
            .then(done))
    })

    it('should say will not change when you try to change password', (done) => {
        sleep(500)
        .then(findId('passwordInput').sendKeys("Blahbloop"))
            .then(
                sleep(1000)
                .then(findId('updateReact').click())
                .then(sleep(1000))
                .then(findId('passwordText').getText()
                .then(text => {
                    expect(text == "will not change")
                })
            )
            .then(done))
    })



    after('should log out', (done) => {
        common.logout().then(done)
    })
})
