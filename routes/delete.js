var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res) {
  const id = req.body.id;

  const query = { _id: id }
  User.remove(query, function(err) {
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
