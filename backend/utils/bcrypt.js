const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(enteredPassword, storedHash) {
  return await bcrypt.compare(enteredPassword, storedHash);
}

module.exports = {
  hashPassword,
  comparePassword
};
