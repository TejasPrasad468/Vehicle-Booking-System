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

    // find user
    const user = await userService.getUserByUsername(userName);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check password
    const isLoggedIn = await comparePassword(password, user.password);
    if (isLoggedIn) {
      return res.status(200).json(user);
    }

    return res.status(401).json({ error: "Login Failed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, emailId, password, isAdmin } = req.body;

    // hash password before saving
    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
      userName,
      emailId,
      password: hashedPassword,
      isAdmin: "0", // For every user this will be the zero
    });

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
