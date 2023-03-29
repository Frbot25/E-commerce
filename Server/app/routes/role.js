const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");


router.post("/register",roleController.register);


module.exports = router;