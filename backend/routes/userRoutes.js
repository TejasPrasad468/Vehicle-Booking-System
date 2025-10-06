const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/getalluser", userController.getAllUser);
// console.log()

router.post("/getuser", userController.getUserByUsername);

router.post("/create", userController.createUser);

module.exports = router;
