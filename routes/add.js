var express = require('express');
var router = express.Router();
let User = require('../models/user');

router.post('/', function(req, res, next) {
  const userData = req.body;
  let newUser = new User(userData);

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      User.find({}, function(err, users) {
        if (err) console.log(err);
        res.json(users);
      });
    }
  });
});

module.exports = router;
