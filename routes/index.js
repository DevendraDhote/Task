var express = require('express');
var router = express.Router();
var UserSchema = require('./users');
var passport = require('passport')
var localStrategy = require('passport-local');
var PostSchema = require('./post');
var moment = require('moment')


passport.use(new localStrategy(UserSchema.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res){
  UserSchema.findOne({username : req.session.passport.user})
  .then(function(fu){
    PostSchema.find()
    .limit(2)
    // .skip(10)
    .populate('userid')
    .then(function(fp){
      res.render('profile', {data:fu, post:fp})
    })
  })
})

router.post('/register', function(req, res){
  var data = new UserSchema({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
  })
  UserSchema.register(data, req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function () {
      res.send('reg done');
    });
  })
  .catch(function(err) {
    res.send(err);
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/profile',
  failureRedirect: '/'
}), function(req, res, next) { })

router.get('/createpostpage', function(req, res){
  res.render('post')
})

router.post('/createpost', function(req, res){
  UserSchema.findOne({username : req.session.passport.user})
  .then(function(fu){
    PostSchema.create({
      userid : fu,
      status : req.body.status,
      createdAt : moment().format('MMMM Do YYYY, h:mm:ss a')
    })
    .then(function(cp){
      res.redirect('/profile')
    })
  })
})







function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/');
  }
};


module.exports = router;
