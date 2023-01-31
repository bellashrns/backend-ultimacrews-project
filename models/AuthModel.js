import mongoose from "mongoose";

const AuthModel = new mongoose.Schema({
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
});

export default mongoose.model("AuthModel", AuthModel);