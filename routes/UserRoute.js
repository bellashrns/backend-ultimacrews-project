import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updatePassword,
    deleteUser
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, getUsers);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser,  updatePassword);
router.patch('/users/data/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser , adminOnly, deleteUser);

export default router;