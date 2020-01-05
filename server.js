const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")


//load env. variables
dotenv.config({ path: "./.env" })
connectDb();
 
const app = express()

//enable body parser
app.use(express.json())

//enable cors
app.use(cors())

//static folder
app.use(express.static(path.join(__dirname, "public")))

//routes
app.use("/api/jude/locations", require("./route/locations"))

const PORT = process.env.PORT 
app.listen(PORT, ()=>console.log(`App is running on ${process.env.NODE_ENV} mode in port ${PORT}`))