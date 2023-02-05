import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updatePassword,
    deleteUser
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Supposed to be:
router.get('/users', verifyUser, getUsers);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, updatePassword);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

// // For Trial & Error:
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.patch('/users/:id', updatePassword);
// router.delete('/users/:id', deleteUser);

export default router;