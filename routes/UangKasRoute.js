import express from "express";
import {
    getUangKas,
    getUangKasById,
    createUangkas,
    updateUangKas,
    deleteUangKas
} from "../controllers/UangKasController.js";
import { verifyUser, bendaharaOnly, adminOnly } from "../middleware/AuthUser.js";
// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, './public/images');
//     }
// });
// const upload = multer({storage});

const router = express.Router();

router.get('/uangkas', verifyUser , getUangKas);
router.get('/uangkas/:id', verifyUser, getUangKasById);
router.post('/uangkas', verifyUser , createUangkas);
router.patch('/uangkas/:id', verifyUser, updateUangKas);
router.delete('/uangkas/:id', verifyUser , adminOnly, deleteUangKas);

export default router;