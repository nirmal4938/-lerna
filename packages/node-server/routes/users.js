var express = require('express');
var router = express.Router();
const User = require('../models')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
