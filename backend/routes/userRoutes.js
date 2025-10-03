const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/getalluser", userController.getAllUser);

router.post("/getuser", userController.getUserByUsername);

router.post("/create", userController.createUser);

module.exports = router;
