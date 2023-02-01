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
    const {username, tempatLahir, tanggalLahir, nim, divisi, jurusan, angkatan, nomorTelp, lineId, instagram, alamat, email, password, role, image} = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    
    const duplicate = await UserModel.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'Username already exists' });
    };

    const hashedPassword = await argon2.hash(password); // 10 is the salt

    const userObject = {
        username,
        tempatLahir,
        tanggalLahir,
        nim,
        divisi,
        jurusan,
        angkatan,
        nomorTelp,
        lineId,
        instagram,
        alamat,
        email,
        password: hashedPassword,
        role,
        image
    };

    const user = await UserModel.create(userObject);

    if (user) {
        res.status(201).json({ message: `User ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    };
};

export const updatePassword = async (req, res) => {
    const { password, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    if ( !password || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    };

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    };

	const match = await argon2.verify(user.password, req.body.password);
	if (!match) return res.status(400).json({ msg: "Wrong Password!" });

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    };

    if (password) {
        user.password = await argon2.hash(newPassword);
    };

    const updatedUser = await user.save();

    if (updatedUser) {
        res.status(201).json({ message: `User ${user.username}'s password updated` });
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