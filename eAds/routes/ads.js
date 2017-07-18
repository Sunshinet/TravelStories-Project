const express = require('express');
const router = express.Router();

router.get('/ads', function(req, res) {
  res.render('ads', { title: 'ads' });
});

module.exports = router;
