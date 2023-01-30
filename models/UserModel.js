import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    tempatLahir:{
        type: String,
        required: false
    },
    tanggalLahir:{
        type: String,
        required: false
    },
    nim:{
        type: String,
        required: false
    },
    divisi:{
        type: String,
        required: false
    },
    jurusan:{
        type: String,
        required: false
    },
    angkatan:{
        type: String,
        required: false
    },
    nomorTelp:{
        type: String,
        required: false
    },
    lineId:{
        type: String,
        required: false
    },
    instagram:{
        type: String,
        required: false
    },
    alamat:{
        type: String,
        required: false
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
        required: false
    }
});

export default mongoose.model("UserModel", UserModel);