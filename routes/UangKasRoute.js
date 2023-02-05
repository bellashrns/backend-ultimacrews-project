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

// What it supposed to be:
router.get('/uangkas', verifyUser , getUangKas);
router.get('/uangkas/:id', verifyUser, getUangKasById);
router.post('/uangkas', upload.single('image'), createUangkas);
// router.post('/uangkas', upload.single('image'), verifyUser, createUangkas);
router.patch('/uangkas/:id', bendaharaOnly, updateUangKas);
router.delete('/uangkas/:id', verifyUser , adminOnly, deleteUangKas);

// //For trial & error:
// router.get('/uangkas', getUangKas);
// router.get('/uangkas/:id', getUangKasById);
// router.post('/uangkas', upload.single('image'), createUangkas);
// // router.post('/uangkas', upload.single('image'), verifyUser, createUangkas);
// router.patch('/uangkas/:id', updateUangKas);
// router.delete('/uangkas/:id', deleteUangKas);

export default router;