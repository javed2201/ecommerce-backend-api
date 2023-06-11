const express = require("express");
const _ = express.Router();
const registrationController = require("../../controllers/registrationController.js");
const loginController = require("../../controllers/loginController.js");
const emailVarificationOtpmatch = require("../../controllers/emailVarificationOtpmatch.js");
_.post("/registration", registrationController)
_.post("/login", loginController)
_.post("/emailvarificationOtpmatch", emailVarificationOtpmatch)

module.exports = _;