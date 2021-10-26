const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
  level: {
    type: Number
  },
  name: {
    type: String
  },
  maxPopulation: {
    type: Number
  },
  productionRate: {
    type: Number
  },
  image: { // link to associated image
    type: String
  },
  levelUpCost: {
    gold: Number,
    wood: Number
  }
});

const Level = model('Level', levelSchema);

module.exports = Level;