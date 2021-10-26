const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
  level: {
    type: Number
  },
  name: {
    type: String
  },
  populationMax: {
    type: Number
  },
  productionRate: {
    type: Number
  },
  image: { // link to associated image
    type: String
  },
  levelUpCost: {
    fruit: Number,
    meat: Number,
    gold: Number,
    wood: Number
  }
});

const Level = model('Level', levelSchema);

module.exports = Level;