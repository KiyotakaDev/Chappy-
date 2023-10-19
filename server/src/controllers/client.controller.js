import path from "path";
import Image from "../models/img.model.js";
import { uploadPath } from "../utils/multerConfig.js";
import fs from "fs";

const setAvatar = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.user;

    const imageFound = await Image.findOne({ user: id });
    if (imageFound) {
      await Image.findOneAndDelete({ user: id });
      const filePath = path.join(uploadPath, imageFound.profileImage);
      fs.unlinkSync(filePath);
    }

    const newImageFile = await new Image({
      profileImage: filename,
      user: id,
      isProfileImageSet: true,
    }).populate("user", "-password");
    const imageSaved = await newImageFile.save();

    return res.json({ user: imageSaved, status: true });
  } catch (error) {
    return res.status(500).json({ error: "This is the error: " + error });
  }
};

// const getAvatar = async (req, res) => {
//   try {
//     const { id } = req.user;

//     const avatar = await Image.findOne({ user: id });
//     if (!avatar) return new Image();

//     return res.json(avatar);
//   } catch (error) {
//     return res.status(500).json({ message: "This is the error: " + error });
//   }
// };

export { setAvatar /*getAvatar*/ };
