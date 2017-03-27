var currentId = 3

const Article = require('./model').Article
const Profile = require('./model').Profile

const articles = [{ id: currentId, author: "author", text: "text", date: new Date(), comments: [ ]},
                 { id: currentId+1, author: "author2", text: "text2", date: new Date(), comments: [ ]},
                 { id: currentId+2, author: "author3", text: "text3", date: new Date(), comments: [ ]}]


function addArticle(req, res, callback) {
  //const newArticle = { id: currentId, author: 'Scotty', body: req.body.body };
  var articleObj = {id: parseInt(Math.random()* 10000), author: req.session.username, text: req.body.text, date: new Date(), comments:""}
  Article.find({}, function (err, docs) {
  // docs is an array
    Article.create(articleObj, function (err, small) {
    if (err)
    {
      console.log("ERROR")
      return handleError(err);
    }
    getFeedArticlesForUser(req.session.username)
      .then(articles => res.json({ articles }))
      .catch(err => res.status(500).json({ error: err.message }))
    })

  })

  }

const getArticles = (req, res) => {
  console.log('in get articles')

  array = [req.session.username]


  Article.find({author: {$in :array}}, (err, articles) => {
    if (!articles ){
      res.sendStatus(401)
    }
    console.log("articles is " + articles)
    res.json({articles:articles.map((article)=> ({
      id: article.id,
      author: article.author,
      text: article.body,
      date: article.date,
      comments: article.comments
    }
    ))})

  })
}

function getFeedArticlesForUser(username) {
  return new Promise((resolve, reject) => {
    Profile.findOne({ username }).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        console.log("NO LOGGED IN USER?")
        return reject(new Error('No logged in user'))
      }
      loggedInUserFollowing = userObj.following

      Article
        .find({
          author: {
            $in: loggedInUserFollowing.concat(username)
          }
        })
        .sort('-date')
        .exec((err, articles) => {
          if (err) return reject(err)
          return resolve(articles)
        })
    })
  })
}

const getArticleById = (req, res) => {
  console.log(req.params.id)
  console.log("GETTING ARTICLES")
  var loggedInUserFollowing = {}


  //neither case
  if (!req.params.id)
  {
    console.log("in neither case")
    //get all users that the loggedinuser is following:
    getFeedArticlesForUser(req.session.username)
      .then(articles => {
          console.log("ARTILES ON BACKEND", articles)
          if (!articles){
            console.log("AINT NO ARTICLES TO FETCH")
            res.json({articles:[]})
          }
          res.json({ articles })
        })
      .catch(err => res.status(404).json({ error: err.message }))
  }

  //id case
  else if (!req.params.id.match(/[a-z]/i))
  {
    console.log("in id case")
    array = [req.params.id]
    Article.find({id: {$in :array}}, (err, articles) => {
      if (!articles ){
        res.sendStatus(401)
      }
      res.json({articles:articles.map((article)=> ({
        id: article.id,
        author: article.author,
        text: article.text,
        date: article.date,
        comments: article.comments
      }
      ))})

    })
  }
  //author case
  else {
    console.log("in author case")
    array = [req.params.id]
    Article.find({author: {$in :array}}, (err, articles) => {
      if (!articles ){
        res.sendStatus(401)
      }
      res.json({articles:articles.map((article)=> ({
        id: article.id,
        author: article.author,
        text: article.text,
        date: article.date,
        comments: article.comments
      }
      ))})

    })
  }

  }

const getHeadline = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 if (req.method == 'GET' && req.url == '/headlines')
 {
   payload = defaultHeadline;
 }

 //res.setHeader('Content-Type', 'application/json')
 //res.statusCode = 200
 res.send(JSON.stringify(payload))
 console.log(JSON.stringify(payload))
}

function isLoggedIn(req, res, next){
    if (!req.session.username){
      res.status(403).json({err: "forbidden"})
      return
    }

    next()
}

const getThreeArticles = (req, res) => {

  res.json(articles)
}



module.exports = app => {
     //app.post('/article', addArticle)
     //app.get('/articles', getArticles)
     app.get('/headlines/', getHeadline)
     //app.get('/articles/:id*?', getArticleById)
    // app.get('/articles', getThreeArticles)
}
