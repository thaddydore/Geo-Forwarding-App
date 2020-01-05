const express = require("express");
const router = express.Router();
const {getLocations, addLocations} = require("../controlers/locations")

//routes
router.route("/").get(getLocations).post(addLocations)

module.exports = router;
