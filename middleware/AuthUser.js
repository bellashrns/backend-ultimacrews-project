import User from "../models/UserModel.js";

export const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda!"});
    } 
    const user = await User.findOne({
            _id:req.session.userId
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    req.userId = user._id;
    req.role = user.role;
    next();
}

export const adminOnly = async(req, res, next) => {
    const user = await User.findOne({
            _id:req.session.userId
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang!"});
    next();
}

export const bendaharaOnly = async(req, res, next) => {
    const user = await User.findOne({
            _id:req.session.userId
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    if(user.role !== "bendahara") return res.status(403).json({msg: "Akses terlarang!"});
    next();
}

export const hrdOnly = async(req, res, next) => {
    const user = await User.findOne({
            _id:req.session.userId
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    if(user.role !== "hrd") return res.status(403).json({msg: "Akses terlarang!"});
    next();
}