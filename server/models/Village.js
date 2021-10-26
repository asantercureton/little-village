const { Schema, model } = require('mongoose');



const villageSchema = new Schema({
  population: {
    type: Number,
    required: true
  },
  abundanceOfResources: { //the multiplier that is applied whenver a resource is to be aqquired by this village (doesnt apply to trades) 
    fruit: Number,
    meat: Number,
    gold: Number,
    wood: Number
  },
  amountOfResources: {
    fruit: Number,
    meat: Number,
    gold: Number,
    wood: Number
  },
  unitAllocation: { //how many people do they have harvesting each resource?
    fruit: Number,
    meat: Number,
    gold: Number,
    wood: Number
  },
  user: { // the user tied to the village
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  trades: [ // the trades this village has up. Will only be used for display, actual trade logic will flow from the trade to the village
    {
      type: Schema.Types.ObjectId,
      ref: "Trade"
    }
  ],
  level: { // the state/level of the village
    type: Schema.Types.ObjectId,
    ref: "Level"
  },
  upgrades: {
    fruit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upgrade"
      }
    ],
    meat: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upgrade"
      }
    ],
    gold: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upgrade"
      }
    ],
    wood: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upgrade"
      }
    ]
  }
},
{ timestamps: true }
);

villageSchema.pre('save', function (next) {
  let now = new Date();
  console.log(Math.abs(now - this.updatedAt) / 1000);
  //Call updateresources
  next();
});

villageSchema.pre('find', function (next) {
  let now = new Date();
  console.log(Math.abs(now - this.updatedAt) / 1000);
  //Call updateresources
  next();
});

villageSchema.methods.updateResources = function () {
  return bcrypt.compare(password, this.password);
};

const Village = model('Village', villageSchema);

module.exports = Village;