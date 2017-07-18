const express = require('express');
const router = express.Router();

router.get('/add', function(req, res) {
  res.render('add', { title: 'Add new Ad' });
});

module.exports = router;
