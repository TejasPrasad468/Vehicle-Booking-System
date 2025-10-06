const userService = require('../services/userService');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { userName, password } = req.body;
    // console.log("req " + JSON.stringify(req.body));
    // find user
    const user = await userService.getUserByUsername(userName);
    // console.log("user " + JSON.stringify(user));
    // console.log("user " + user.password);
    
    if (!user) {
      // console.log("user 2 ");
      return res.status(404).json({ error: "User not found" });
    }
    // console.log("user 3 " + password);
    // console.log("user 4 " + user.password);

    // check password
    const isLoggedIn = await comparePassword(password, user.password);
    // console.log("isLoggedIn " + isLoggedIn);
    if (isLoggedIn) {
      return res.status(200).json(user);
    }
    // console.log("isLoggedIn 2 ");
    return res.status(401).json({ error: "Login Failed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, emailId, password } = req.body;
    // hash password before saving
    const hashedPassword = await hashPassword(password);
    
    // console.log("req.body 1");
    const user = await userService.createUser({
      userName,
      emailId,
      password: hashedPassword,
      isAdmin: 0, // For every user this will be the zero
    });
    // console.log("req.body 2");

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllUser,
  getUserByUsername,
  createUser
};
