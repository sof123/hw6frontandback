const express = require('express')
const bodyParser = require('body-parser')
const Headline = require('./model').Headline
const Profile = require('./model').Profile
var currentId = 4

var fakeLoggedInProfile = {
  username: "sof1",
  status: "status",
  following: [],
  zipcode:"77459",
  email:"sof1@rice.edu",
  avatars:["http://www.clker.com/cliparts/D/t/t/Y/m/A/black-stick-figure.svg"],
  dob:"",
  headline:""
}

var fakeProfile = {
  username: "sof2",
  status: "status",
  following: [],
  zipcode:"",
  email:"sof2@rice.edu",
  avatar:"",
  dob:"",
  headline:"fake profile headline"
}

fakeArticleOne = {
  id: 1,
  author:"sof1",
  text: "fake article one",
  date: "04-12-1995",
  comments: ["fakeArticleOne comment", "This article sucks", "Good article bro"]
}

fakeArticleTwo = {
  id: 2,
  author:"sof2",
  text: "fake article two",
  date: "04-13-1995",
  comments: ["fakeArticleTwo comment", "This article sucks", "Good article bro"]
}

fakeArticleThree = {
  id: 3,
  author:"sof3",
  text: "fake article three",
  date: "04-13-1995",
  comments: ["fakeArticleThree", "This article sucks", "Good article bro"]
}

var fakeArticles = {
  articles: [fakeArticleOne, fakeArticleTwo, fakeArticleThree]
}

var fakeProfiles = {
  profiles: [fakeLoggedInProfile, fakeProfile]
}

const fakeGetHeadlineUsers = (req, res) => {
  console.log(req.params.users)
  var array = [];
  //get headline of requested users
  if (req.params.users && req.params.users.includes(','))
  {
    headlinesArray = []
    array = req.params.users.split(',');
    for (var i = 0; i < array.length; i++){
      for (var j = 0; j < fakeProfiles.profiles.length; j++){
        if (fakeProfiles.profiles[j].username === array[i])
        {
          headlinesArray.push({username: array[i], headline: fakeProfiles.profiles[j].headline})
        }
      }
    }
    res.json({headlines: headlinesArray})
  }
  //get headline of requested user
  else if (req.params.users) {
    user = req.params.users
    for (var i = 0; i < fakeProfiles.profiles.length; i++){
      if (user == fakeProfiles.profiles[i].username){
        res.json({headlines: [{username: user, headline: fakeProfiles.profiles[i].headline}]})
      }
    }

  }
  //get logged  user headline
  else {
      res.json({headlines: [{username:fakeLoggedInProfile.username, headline: fakeLoggedInProfile.headline}]})
  }

}

const fakePutHeadline = (req, res) => {
    fakeLoggedInProfile.headline = req.body.headline;
    res.json({username:fakeLoggedInProfile.username, headline: req.body.headline})
}

const fakeGetArticles =  (req, res) =>
{
  articlesToReturn = {articles:[]}
  if (!req.params.id){
    res.json(fakeArticles)
    return
  }
  else{
    theId = req.params.id
    fakeArticles.articles.forEach(function(element) {
      if (element.id == theId){
        articlesToReturn.articles.push(element)
      }
    });
  }
  if (articlesToReturn.articles.length == 0)
  {
    res.sendStatus(404)
    return
  }
  res.json(articlesToReturn)
}

const fakeAddArticle = (req, res) => {

  fakeArticles.articles.push({
    id: currentId,
    author: fakeLoggedInProfile.username,
    text: req.body.text,
    date: "4-12-1993",
    comments: ["appended article"]
  })
  currentId+=1
  res.json(fakeArticles)

}

const fakeGetEmail = (req, res) => {
    res.json({username:fakeLoggedInProfile.username, email: req.body.email})
}
const fakeGetZip = (req, res) => {
    res.json({username:fakeLoggedInProfile.username, zipcode: req.body.zipcode})
}
const fakeGetAvatars = (req, res) => {
    res.json({username:fakeLoggedInProfile.username, avatars: fakeLoggedInProfile.avatars})
}

const fakePutAvatar = (req, res) => {
    res.json({username:fakeLoggedInProfile.username, avatar: fakeLoggedInProfile.avatars[0]})
}





const defaultHeadline = {
        username: 'sep1',
        headline: 'defaultHeadline',
}

const index = (req, res) => {
    console.log(req.params.user)
    res.send({ hello: 'world' })
}

function removedArray(arr, element)
{
  var index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


const putHeadline = (req, res) => {
  Profile.update({ username: req.session.username}, { $set: { headline: req.body.headline }}, (err, zip)=>{
    //var retObj = {'username': req.session.username, 'headline': req.body.headline}
    res.json({'username': req.session.username, 'headline': req.body.headline})
  });
}

const getHeadlineUsers = (req, res) => {
  var array;
  if (req.params.users.includes(","))
  {
    array = req.params.users.split(',');
  }
  else {
    array = [req.params.users]
  }

  console.log("array length is " + array.length)
  console.log("array is " + array)
    Profile.find({username: {$in :array}}, (err, users) => {
      if (!users ){
        res.sendStatus(401)
      }
      res.json({headlines:users.map((user)=> ({
        username: user.username,
        headline: user.headline
      }
      ))})

    })
  }

const getEmailUser = (req, res) => {
  console.log("in get email user")
  //console.log(req.params.user)
  if (req.params.user){
    console.log("in username case")
    Profile.findOne({username: req.params.user}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.sendStatus(401)
        return
      }
      var msg = {username: req.params.user, email:userObj.email}
      res.send(msg)
    })
  }
  else {
    console.log("in blank case")
    Profile.findOne({username: req.session.username}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.sendStatus(401)
        return
      }
      var msg = {username: req.session.username, email:userObj.email}
      res.send(msg)
    })
  }
}


const putEmail = (req, res) => {
  console.log(req.session.username)
  Profile.update({ username: req.session.username}, { $set: { email: req.body.email }}, (err, zip)=>{
    var retObj = {username: req.session.username, email: req.body.email}
    res.json(retObj)
  });
}

const putZipcode = (req, res) => {
  console.log(req.session.username)
  Profile.update({ username: req.session.username}, { $set: { zipcode: req.body.zipcode }}, (err, zip)=>{
    var retObj = {username: req.session.username, zipcode: req.body.zipcode}
    res.json(retObj)
  });
}

const getHeadline = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 /*
 if (//req.method == 'GET' && req.url == '/headlines')
 {
   payload = defaultHeadline;
 }
 */
 payload = defaultHeadline

 //res.setHeader('Content-Type', 'application/json')
 //res.statusCode = 200
 res.send(JSON.stringify(payload))
}

const getZipcodeUser = (req, res) => {
  console.log(req.params.user)
  Profile.findOne({username: req.params.user}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: req.params.user, zipcode:userObj.zipcode}
    res.send(msg)
  })
}

const getDOB = (req, res) => {
  Profile.findOne({username: req.session.username}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: req.session.username, dob:userObj.dob}
    res.send(msg)
  })
}

const fakeGetDOB = (req, res) => {
  res.json({username: "sof1", dob:"4-12-1995"})
}

const getAvatar = (req, res) => {
  Profile.findOne({username: req.session.username}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: req.session.username, avatar:userObj.avatar}
    res.send(msg)
  })
}

const getFollowingUser = (req, res) => {
  //if there is parameter
  if (req.params.user)
  {
    Profile.findOne({username: req.params.user}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.json({username:req.params.user, following:[]})
        //res.sendStatus(401)
        return
      }
      var msg = {username: req.params.user, following:userObj.following}
      res.json(msg)
    })
  }

  //no params so get all users that the loggedinuser is following
  else{
    Profile.findOne({username: req.session.username}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.json({username:req.session.username, following:[]})
        //res.sendStatus(401)
        //return
      }
      var msg = {username: req.params.user, following:userObj.following}
      res.json(msg)
    })
  }
}

const fakeGetFollowingUser = (req, res) => {
  res.json({username: "sof1", following:["sof2"]})
}

const follow = (req, res) => {
  console.log("in follow")
  //get current following array
  var currentFollowing;
  Profile.findOne({username: req.session.username}).then(user => {
    userObj = user;
    console.log("user object is " + userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    currentFollowing = userObj.following;


    Profile.findOne({username: req.params.user}).then(user => {

    //if no user with that username in database
    if (!user){
      console.log("USER NOT FOUND CANNOT FOLLOW")
      res.status(404).json({error:"ERROR CANNOT FOLLOW UNKNOWN USER"})
      return
    }
    Profile.update({ username: req.session.username}, { $set: { following: currentFollowing.concat([req.params.user]) }}, (err, zip)=>{
      //var retObj = {username: req.session.username, headline: req.body.headline}
      //res.json(retObj)
      Profile.findOne({username: req.session.username}).then(user => {
        userObj = user;
        console.log(userObj)
        //compare with salt
        if (!userObj ){
          res.sendStatus(401)
          return
        }
        var msg = {username: req.session.username, following:currentFollowing.concat([req.params.user])}
        res.send(msg)
      })
    });
  })
})
}

const fakeFollow = (req, res) => {
  res.json({username:"sof1", following:["sof2"]})
}

const unfollow = (req, res) => {
  //get current following array
  var currentFollowing;
  Profile.findOne({username: req.session.username}).then(user => {
    userObj = user;
    console.log("user object is " + userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    currentFollowing = userObj.following;
    Profile.update({ username: req.session.username}, { $set: { following: removedArray(currentFollowing,req.params.user) }}, (err, zip)=>{
      //var retObj = {username: req.session.username, headline: req.body.headline}
      //res.json(retObj)
      Profile.findOne({username: req.session.username}).then(user => {
        userObj = user;
        console.log(userObj)
        //compare with salt
        if (!userObj ){
          res.sendStatus(401)
          return
        }
        var msg = {username: req.session.username, following:removedArray(currentFollowing,req.params.user)}
        res.send(msg)
      })
    });

  })
}

const getHeadlines = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 payload = defaultHeadline
 res.send(JSON.stringify(payload))
}

const fakePutZipcode = (req, res) =>{
  fakeLoggedInProfile.zipcode = req.body.zipcode;
  res.json({username:fakeLoggedInProfile.username, zipcode: req.body.zipcode})

}

const fakePutEmail = (req, res) =>{
  fakeLoggedInProfile.email = req.body.email;
  res.json({username:fakeLoggedInProfile.username, email: req.body.email})
}

const isLoggedIn = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 payload = defaultHeadline
 res.send(JSON.stringify(payload))
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/', fakeGetHeadlineUsers)
     app.put('/headline', fakePutHeadline)
     app.get('/headlines/:users?', fakeGetHeadlineUsers)
     app.get('/email/:user?', fakeGetEmail)
     app.get('/zipcode/:user?', fakeGetZip)
     app.get('/avatars/:user?', fakeGetAvatars)
     app.put('/avatar', fakePutAvatar)
     app.get('/following/:user?', fakeGetFollowingUser)
     app.put('/zipcode', fakePutZipcode)
     app.put('/email', fakePutEmail)
     app.put('/following/:user', fakeFollow)
     app.delete('/following/:user', fakeFollow)
     //app.get('/headlines/:users*?', isLoggedIn, getHeadlines)
     app.get('/dob', fakeGetDOB)
     app.post('/article', fakeAddArticle)
     //app.get('/articles', getArticles)
     app.get('/articles/:id*?', fakeGetArticles)
}
