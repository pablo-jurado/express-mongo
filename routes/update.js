var express = require('express');
var router = express.Router();
let User = require('../models/user');

router.post('/', function(req, res) {
  const userData = req.body;

  const query = { _id: userData.id }
  User.update(query, userData, function(err) {
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
