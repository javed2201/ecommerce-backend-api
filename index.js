require("dotenv").config();
const express = require('express')
const dbConnection = require("./config/dbConnection.js")
const routes = require("./routes")
const cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
dbConnection()
app.use(routes);
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000)