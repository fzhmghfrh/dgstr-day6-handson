const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');

const SALT_ROUNDS = 10;

const generateUserId = () => {
    return uuidv4();
};

// Function to create a new user
// const createUser = async (userData) => {
//     userData.user_id = generateUserId();
//     userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
//     return await userRepository.addUser(userData);
// };

// Rename createUser to registUser
const registUser = async (userData) => {
    userData.user_id = generateUserId();
    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    return await userRepository.addUser(userData);
};


// Function to get all users
const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

// Function to get one user by user_id
const getUser = async (userId) => {
    return await userRepository.getUserByUserId(userId);
};

// Function to update user by user_id
const updateUser = async (userId, userData) => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    }
    userData.updated_at = Date.now();
    return await User.findOneAndUpdate({ user_id: userId }, userData, { new: true });
};

// Function to delete user by user_id
const deleteUser = async (userId) => {
    return await userRepository.deleteUserById(userId);
};

// Function to search users by name
const searchUser = async (username) => {
    return await userRepository.searchUserByUsername(username);
};

const findUserByEmail = async (email) => {
    return await userRepository.findUserByEmail(email);
};

module.exports = {
    registUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    searchUser,
    findUserByEmail
};
