import mongoose from "mongoose";

const UangKas = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserModel'
    },
    image:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    bulan:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: false,
        default: ''
    },
    status:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("UangKas", UangKas);