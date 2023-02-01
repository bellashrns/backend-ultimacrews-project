import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    tempatLahir:{
        type: String,
        required: false,
        default: ""
    },
    tanggalLahir:{
        type: String,
        required: false,
        default: ""
    },
    nim:{
        type: String,
        required: false,
        default: ""
    },
    divisi:{
        type: String,
        required: false,
        default: ""
    },
    jurusan:{
        type: String,
        required: false,
        default: ""
    },
    angkatan:{
        type: String,
        required: false,
        default: ""
    },
    nomorTelp:{
        type: String,
        required: false,
        default: ""
    },
    lineId:{
        type: String,
        required: false,
        default: ""
    },
    instagram:{
        type: String,
        required: false,
        default: ""
    },
    alamat:{
        type: String,
        required: false,
        default: ""
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default: ""
    }
});

export default mongoose.model("UserModel", UserModel);