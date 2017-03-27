const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
require('./db.js')
const session = require('express-session');
const theSecret = "aoijfioawjeiofjawejfioawjifojeaewjiofwjaioefj"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').load()
}

//mongoose.connect(process.env.MONGOLAB_URI);


function enableCORS(req, res){

}

const app = express()
app.use(bodyParser.json())
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", res.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Session-Id Accept");
  res.header('Access-Control-Expose-Headers','Location, X-Session-Id')
  res.header('Access-Control-Allow-Credentials','true')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  if (req.method === 'OPTIONS'){
    res.status(200).send('OK')
  }
  else {
    next();
  }
});
*/
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://sof1frontend.surge.sh');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();//
});
console.log()
app.use(session({
  secret: theSecret,
  cookie: { maxAge: 3600000, httpOnly:true },
  store: new (require('express-sessions'))({
     storage: 'mongodb',
     instance: mongoose
})
}));
require('./profile')(app)
require('./articles')(app)
require('./auth')(app)

//mongoose.disconnect();

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
