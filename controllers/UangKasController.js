import UangKas from "../models/UangKas.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getUangKas = async (req, res) => {
  try {
    let response;
    if (req.role === "bendahara" || req.role === "admin") {
      response = await UangKas.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
    } else {
      response = await UangKas.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
          },
        ],
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
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUangkas = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { bulan, notes, status } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // "host" bakal jadi domain
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLocaleLowerCase()))
    return res.status(422).json({ msg: "Invalid Image!" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await UangKas.create({
        image: fileName,
        url: url,
        bulan: bulan,
        notes: notes,
        status: status,
      });
      res.status(201).json({ msg: "Uang Kas berhasil disubmit!" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateUangKas = async (req, res) => {
  const buktiTRF = await UangKas.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!buktiTRF) return res.status(404).json({ msg: "Uang Kas not found!" });
  let fileName = "";
  if (req.files === null) {
    fileName = UangKas.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "Invalid Image!" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    fs.unlinkSync(`./public/images/${buktiTRF.image}`);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { bulan, notes, status } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await UangKas.update(
        {
            image: fileName,
            url: url,
            bulan: bulan,
            notes: notes,
            status: status,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    res.status(200).json({ msg: "Uang Kas berhasil diupdate!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUangKas = async (req, res) => {
  const buktiTRF = await UangKas.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!buktiTRF) return res.status(404).json({ msg: "Uang Kas not found!" });
  try {
    fs.unlinkSync(`./public/images/${buktiTRF.image}`);
    await UangKas.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Uang Kas berhasil dihapus!" });
  } catch (error) {
    console.log(error.message);
  }
};
