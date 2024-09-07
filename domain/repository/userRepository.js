const User = require('../model/userModel');

// Add a new user
const addUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Get a user by user_id
const getUserByUserId = async (userId) => {
    return await User.findOne({ user_id: userId });
};

// Get all users
const getAllUsers = async () => {
    return await User.find();
};

// Delete a user by user_id
const deleteUserById = async (userId) => {
    return await User.deleteOne({ user_id: userId });
};

// Function to search user by username
const searchUserByUsername = async (username) => {
    return await User.find({ username: new RegExp(username, 'i') }); // Case-insensitive search
};

// Function to update a user by user_id
const updateUserById = async (userId, updatedData) => {
    return await User.findOneAndUpdate({ user_id: userId }, updatedData, { new: true });
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


module.exports = {
    addUser,
    getUserByUserId,
    getAllUsers,
    deleteUserById,
    searchUserByUsername,
    updateUserById,
    findUserByEmail
};
