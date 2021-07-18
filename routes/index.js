var express = require('express');
var router = express.Router();

const passport = require('passport');
const checkerMiddleware = require('../middlewares/checker.middleware');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/post-detail', function(req, res, next) {
  res.render('postDetail', { title: 'Express' });
});

router.get(
  '/profile',
  function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

module.exports = router;
