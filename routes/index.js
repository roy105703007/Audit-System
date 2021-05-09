var express = require('express');
var router = express.Router();
var transactions = require('../models/transaction');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function (req, res) {
  res.send('About this wiki');
})

router.get('/addTransaction', function (req, res) {
  var sender = req.query.sender
  var transaction = new transactions({
    sender: req.query.sender,
    recipient: req.query.recipient,
    amount: req.query.amount
  });
  transaction.save(function (err) {
    if (err) {
      console.log(err);
      res.json({
        status: false,
        msg: "失敗"
      })
    }
    console.log('註冊成功', sender);
    res.json({
      status: true,
      msg: "成功"
    })
  })
})
module.exports = router;
