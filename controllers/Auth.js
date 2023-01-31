import UserModel from "../models/UserModel.js";
import argon2 from "argon2";
import { request, response } from "express";

export const login = async(req,res)=>{
    const user = await UserModel.findOne({
        email:req.body.email
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password!"});
    req.session.userId = user._id;
    const id = user.id;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    res.status(200).json([id, username, email, role]);
    response.send(req.session.userId);
}

export const Me = async(req,res)=>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda!"});
    } 
    const user = await UserModel.findOne({
            _id:req.session.userId
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    res.status(200).json(user);
}

export const logOut = async (req,res) => {
    request.session.destroy((err)=>{
        if(err) return response.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout."});
    });
}