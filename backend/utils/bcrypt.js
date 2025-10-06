const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
// console.log()

async function hashPassword(password) {
  // console.log("SALT ROUND = " + SALT_ROUNDS);
  const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));
  // console.log("SALT ROUND typeof = " + typeof SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(enteredPassword, storedHash) {
  return await bcrypt.compare(enteredPassword, storedHash);
}

module.exports = {
  hashPassword,
  comparePassword
};
