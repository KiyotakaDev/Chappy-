import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { createAccestokens } from "../utils/createToken.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFoundByUsername = await User.findOne({ username });
    if (userFoundByUsername)
      return res
        .status(409)
        .json({ message: "Username already in use", status: false });

    const userFoundByEmail = await User.findOne({ email });
    if (userFoundByEmail)
      return res
        .status(409)
        .json({ message: "Email already in use", status: false });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();

    const { accessToken, refreshToken } = await createAccestokens({
      id: userSaved._id,
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });
    res.cookie("refreshed", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    const userWithNoPass = {...userSaved._doc}
    delete userWithNoPass.password

    return res.json({ user: userWithNoPass, status: true });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userFound = await User.findOne({ username });
    if (!userFound)
      return res
        .status(401)
        .json({ message: "Incorrect username or password", status: false });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Incorrect username or password", status: false });

    const { accessToken, refreshToken } = await createAccestokens({
      id: userSaved._id,
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });
    res.cookie("refreshed", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    const userWithNoPass = {...userFound._doc}
    delete userWithNoPass.password

    return res.json({ user: userWithNoPass, status: true });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const allContacts = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "username",
      "email",
    ]);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const logout = async (_, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { register, login, logout, allContacts };
