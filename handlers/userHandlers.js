const userUsecase = require('../domain/usecase/userUsecase');
const User = require('../domain/model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 


const getAllUsers = async (req, res) => {
    try {
        const users = await userUsecase.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userUsecase.getUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error });
    }
};

// const createUser = async (req, res) => {
//     try {
//         const newUser = await userUsecase.createUser(req.body);
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// };


// Rename createUser to registUser
const registUser = async (req, res) => {
    try {
        const newUser = await userUsecase.registUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userUsecase.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userUsecase.deleteUser(req.params.id);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};


const searchUser = async (req, res) => {
    try {
        const users = await userUsecase.searchUser(req.query.username);
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error searching for users', error });
    }
};

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userUsecase.findUserByEmail(email); // Function to find user by email
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// };

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userUsecase.findUserByEmail(email); // Find user by email
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error); // Log error to the console
        res.status(500).json({ message: 'Error logging in', error: error.message }); // Include error message in response
    }
};


module.exports = {
    getAllUsers,
    getUser,
    registUser,
    updateUser,
    deleteUser,
    searchUser,
    loginUser
};
