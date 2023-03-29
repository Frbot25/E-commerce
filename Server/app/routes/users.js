const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const {loginCheck} = require('../middlewares/auth');

router.get("/all-user", );
router.post("/login", usersController.login );
router.post("/signup",usersController.signUp );
router.put("/:id",loginCheck, usersController.updateUserById );
router.delete("/:id", loginCheck, usersController.deleteUserById);

router.post("/change-password", );

module.exports = router;