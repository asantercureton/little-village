const { Schema, model } = require('mongoose');

const upgradeSchema = new Schema({
  name: {
    type: String
  },
  resource: {
    type: String
  },
  summary: {
    type: String
  },
  cost: {
    gold: Number,
    wood: Number
  }
});

const Upgrade = model('Upgrade', upgradeSchema);

module.exports = Upgrade;