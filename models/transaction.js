var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/myNewDB' );
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    sender: String,
    recipient: String,
    amount: Number
});

var TransactionModel = mongoose.model('TransactionModel', TransactionSchema);
module.exports = TransactionModel;

// //Export model
// module.exports = mongoose.model('Transaction', TransactionSchema);
// mongoose.model('TransactionModel', TransactionSchema);
// mongoose.connect( 'mongodb://localhost/myNewDB' );