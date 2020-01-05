// @Get all locations
//@rote /api/jude/location

const Locations = require("../model/locations")

//route get request
exports.getLocations = async (req, res, next) => {
  try {
    const location = await Locations.find()
    res.status(200)
      .json({
        success: true,
        count: location.length,
        data: location
      });
    
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "server error"
    })
  }
};

//route post request
exports.addLocations = async (req, res, next) => {
  try {
    const location = await Locations.create(req.body)
    res.status(200)
      .json({
        success: true,
        data: location
      });
    
  }
  catch (error) {
    console.log(error)
    if (error.code === 11000)
      return res.status(500).json({
      error: "Id Already Exist"
      })
      return res.status(500).json({
        error: "server error"
      })
  }
};