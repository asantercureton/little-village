const { Schema, model } = require('mongoose');



const tradeSchema = new Schema({
  selling: { // what are they offering?
    amount: Number, //how much of it?
    resource: String //what resource?
  },
  buying: {
    amount: Number,
    resource: String
  },
  amount: Number,//how many times are they willing to make this trade before it deletes itself? Leave blank for infinite
  village: {
    type: Schema.Types.ObjectId,
    ref: "Village" //The village offering this trade
  }
});

const Trade = model('Trade', tradeSchema);

module.exports = Trade;