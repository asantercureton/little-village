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
  image: { // link to associated image
    type: String
  },
  levelUpCost: {
    gold: Number,
    wood: Number
  },
  buyPopulation: {
    fruit: Number,
    meat: Number
  },
  nextLevel: {
    type: String
  }
});

const Level = model('Level', levelSchema);

module.exports = Level;