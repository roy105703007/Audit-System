var express = require('express');
var router = express.Router();
var transactions = require('../models/transaction');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const platformAddr = "0x6aFAaAC01f3EC54bcC216Ff7130eeDd7b6aE4bEC";
const payAddress = "0xdDa3dc24D500e3b3F66D5b8fBCe358bDD6D99e2d";
const platformPKey = "34c853d5ffacb8bb9e8a16f74e4837f361642c6943389a204ced80f4862560d8";
const auditAddress = "0xa8d97d2d1bE595AC2039a539a212a28A18F9bEC8";
var myContract = new web3.eth.Contract([
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "senderID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "receiverID",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "payMoney",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "userName",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userID",
        "type": "string"
      }
    ],
    "name": "getUserData",
    "outputs": [
      {
        "internalType": "string",
        "name": "userName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "ownMoney",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
], payAddress);


var auditContract = new web3.eth.Contract([
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "auditID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "transactionID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "uuid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "blockchainSender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "databaseSender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "blockchainReceiver",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "databaseReceiver",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "blockchainAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "databaseAmount",
        "type": "uint256"
      }
    ],
    "name": "audit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "auditID",
        "type": "string"
      }
    ],
    "name": "getAuditHistory1",
    "outputs": [
      {
        "internalType": "bool",
        "name": "auditResult",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "transactionID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "uuid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "blockchainSender",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "auditID",
        "type": "string"
      }
    ],
    "name": "getAuditHistory2",
    "outputs": [
      {
        "internalType": "string",
        "name": "databaseSender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "blockchainReceiver",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "databaseReceiver",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "blockchainAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "databaseAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
], auditAddress);
// function platformTransaction(txdata, contractAddr) {
//   return new Promise((resolve, reject) => {
//     web3.eth.getTransactionCount(platformAddr, "pending").then(function (nonce) {
//       var rawTx = {
//         chainId: 15,
//         nonce: Web3.utils.toHex(nonce),
//         gasPrice: Web3.utils.toHex(10000),
//         gasLimit: Web3.utils.toHex(3000000),
//         to: contractAddr,
//         value: '0x00',
//         data: txdata
//       }

//       var Tx = require('ethereumjs-tx');
//       var tx = new Tx(rawTx);
//       var pKey = new Buffer(platformPKey, 'hex');
//       tx.sign(pKey);
//       var serializedTx = tx.serialize();
//       web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(function (receipt, err, hash) {
//         if (receipt) {
//           console.log("receipt:\n" + JSON.stringify(receipt));
//           resolve();
//         } else if (err) {
//           console.log(JSON.stringify(err));
//         } else {
//           console.log("????")
//         }
//       })
//     })
//   })
// }


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
        msg: "上資料庫失敗"
      })
    }
    console.log('成功', sender);
    res.json({
      status: true,
      msg: "上資料庫成功"
    })
  })
})


router.get('/payMoney', function (req, res) {
  var sender = req.query.sender;
  var recipient = req.query.recipient;
  var amount = req.query.amount;
  var txdata = myContract.methods.payMoney(sender, recipient, amount).encodeABI();
  // platformTransaction(txdata, payAddress).then(function () {
  //   console.log("已完成交易")
  // })
  web3.eth.getTransactionCount(platformAddr, "pending").then(function (nonce) {
    var Tx = require('ethereumjs-tx')
    var rawTx = {
      chainId: 15,
      nonce: Web3.utils.toHex(nonce),
      gasPrice: Web3.utils.toHex(10000),
      gasLimit: Web3.utils.toHex(3000000),
      to: payAddress,
      value: '0x00',
      data: txdata
    }

    var tx = new Tx(rawTx);
    var pKey = new Buffer(platformPKey, 'hex');
    tx.sign(pKey);
    var serializedTx = tx.serialize();
    try {
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(function (receipt, err, hash) {
        if (receipt) {
          console.log("receipt:\n" + JSON.stringify(receipt));
          res.json({
            status: true,
            msg: "成功",
            receipt: receipt
          })
        } else if (err) {
          res.status(err.statusCode).send(err.message);
          console.log(JSON.stringify(err));
          res.json({
            status: false,
            msg: "失敗",
            err: err
          })
        } else {
          console.log("????")
        }
      })
    } catch (error) {
      throw createError(400, error);
    }

  })
})


router.get('/audit', function (req, res) {
  var date = req.query.date;
  var transactionID = req.query.transactionID;
  var uuid = req.query.uuid;
  var blockchainSender = req.query.blockchainSender;
  var databaseSender = req.query.databaseSender;
  var blockchainReceiver = req.query.blockchainReceiver;
  var databaseReceiver = req.query.databaseReceiver;
  var blockchainAmount = req.query.blockchainAmount;
  var databaseAmount = req.query.databaseAmount;

  var txdata = auditContract.methods.audit(date, transactionID, uuid, blockchainSender, databaseSender, blockchainReceiver,
    databaseReceiver, blockchainAmount, databaseAmount).encodeABI();
  web3.eth.getTransactionCount(platformAddr, "pending").then(function (nonce) {
    var Tx = require('ethereumjs-tx')
    var rawTx = {
      chainId: 15,
      nonce: Web3.utils.toHex(nonce),
      gasPrice: Web3.utils.toHex(10000),
      gasLimit: Web3.utils.toHex(3000000),
      to: auditAddress,
      value: '0x00',
      data: txdata
    }

    var tx = new Tx(rawTx);
    var pKey = new Buffer(platformPKey, 'hex');
    tx.sign(pKey);
    var serializedTx = tx.serialize();
    try {
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(function (receipt, err, hash) {
        if (receipt) {
          console.log("receipt:\n" + JSON.stringify(receipt));
          res.json({
            status: true,
            msg: "成功",
            receipt: receipt
          })
        } else if (err) {
          res.status(err.statusCode).send(err.message);
          console.log(JSON.stringify(err));
          res.json({
            status: false,
            msg: "失敗",
            err: err
          })
        } else {
          console.log("????")
        }
      })
    } catch (error) {
      throw createError(400, error);
    }

  })
})
module.exports = router;
