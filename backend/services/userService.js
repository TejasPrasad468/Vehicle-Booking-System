const User = require('../models/user');

const getAllUser = async () => {
    return await User.find();
};
// console.log()

const createUser = async (data) => {
    const user = new User(data);
    return await user.save();
};

const getUserByUsername = async (userName) => {
    return await User.find({userName});
};

module.exports = {
    getAllUser,
    createUser,
    getUserByUsername
}