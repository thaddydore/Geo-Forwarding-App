const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder")

//create location schema
const locationSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please Add a Store Id"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be less than 10"]
  },
  address: {
    type: String,
    required: [true, "Please Add Address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2Dsphere"
    },
    formattedAdress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});
//geocode create location
locationSchema.pre("save", async function(req, res, next) {
  const loc = await geocoder.geocode(this.address)
  
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
  }

  //do not save address to Db
  this.address = undefined
  next()
})

module.exports = mongoose.model("Locations", locationSchema);