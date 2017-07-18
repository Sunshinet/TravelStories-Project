const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('home', { title: 'EAds Project' });
});

router.get('/add', function(req, res) {
  res.render('add', { title: 'Add new Ad' });
});

router.get('/ads', function(req, res) {
  res.render('ads', { title: 'ads' });
});

module.exports = router;
