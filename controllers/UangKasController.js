import UangKas from "../models/UangKas.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getUangKas = async (req, res) => {
  try {
    let response;
    if (req.role === "bendahara" || req.role === "admin") {
      response = await UangKas.find({
        // include: [
        //   {
        model: User,
        //   },
        // ],
      });
    } else {
      response = await UangKas.find({
        // where: {
        userId: req.userId,
        // },
        // include: [
        // {
        model: User,
        //   },
        // ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUangKasById = async (req, res) => {
  try {
    const response = await UangKas.findOne({
      _id: req.params.id,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUangkas = async (req, res) => {
  const { bulan, notes, status } = req.body;
  let file = req.file.path;

  file = file.replace(/\\/g, "/");

  const fileName = req.file.filename;

  if (!file) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  fs.writeFileSync(file, req.file.buffer);

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // "host" bakal jadi domain

  const uangkas = await UangKas.create({
    userId: req.userId,
    image: file,
    url: url,
    bulan: bulan,
    notes: notes,
    status: status,
  });

  if (uangkas) {
    res.status(201).json({ msg: "Pembayaran Uang Kas Uploaded" });
  } else {
    res.status(400).json({ msg: "Invalid Uang Kas Data" });
  }
};

export const updateUangKas = async (req, res) => {
  const uangkas = await UangKas.findOne({
    _id: req.params.id,
  });
  if (!uangkas) return res.status(404).json({ msg: "Uang Kas not found!" });

  const { bulan, notes, status } = req.body;

  let file = req.file.path;

  if (!file) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  file = file.replace(/\\/g, "/");

  const fileName = req.file.filename;

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // "host" bakal jadi domain

  uangkas.image = file;
  uangkas.url = url;
  uangkas.bulan = bulan;
  uangkas.notes = notes;
  uangkas.status = status;

  const updatedUangKas = await uangkas.save();

  if (updatedUangKas) {
    res.status(201).json({ message: `Uang Kas updated` });
  } else {
    res.status(400).json({ message: "Invalid uang kas data received" });
  }
};

export const deleteUangKas = async (req, res) => {
  const uangkas = await UangKas.findOne({
    _id: req.params.id,
  });
  if (!uangkas) return res.status(404).json({ msg: "Uang Kas not found!" });
  try {
    fs.unlinkSync(`${uangkas.image}`);
    await UangKas.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({ msg: "Uang Kas berhasil dihapus!" });
  } catch (error) {
    console.log(error.message);
  }
};
