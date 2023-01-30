import UserModel from "../models/UserModel.js";
import UangKas from "../models/UangKas.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const users = await UserModel.findById(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    
    const duplicate = await UserModel.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'Username already exists' });
    };

    const hashedPassword = await argon2.hash(password); // 10 is the salt

    const userObject = { username, password: hashedPassword, email, role };

    const user = await UserModel.create(userObject);

    if (user) {
        res.status(201).json({ message: `User ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    };
};

export const updatePassword = async (req, res) => {
    const { username, password } = req.body;
    const id = req.params.id;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    };

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    };

    const duplicate = await UserModel.findOne({ username });

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(400).json({ message: 'Username already exists' });
    };

    user.username = username;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    };

    const updatedUser = await user.save();

    if (updatedUser) {
        res.status(201).json({ message: `User ${updatedUser.username}'s password updated` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    };
};

export const deleteUser = async (req, res) => {
    try {
        const inputUser = await UserModel.deleteOne(
            { _id: req.params.id }
        );
        res.status(200).json(inputUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};