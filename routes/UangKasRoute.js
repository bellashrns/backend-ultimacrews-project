import express from "express";
import {
    getUangKas,
    getUangKasById,
    createUangkas,
    updateUangKas,
    deleteUangKas
} from "../controllers/UangKasController.js";
import { verifyUser, bendaharaOnly, adminOnly } from "../middleware/AuthUser.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

router.get('/uangkas', verifyUser , getUangKas);
router.get('/uangkas/:id', verifyUser, getUangKasById);
router.post('/uangkas', upload.single('image'), createUangkas);
router.patch('/uangkas/:id', verifyUser, updateUangKas);
router.delete('/uangkas/:id', verifyUser , adminOnly, deleteUangKas);

export default router;