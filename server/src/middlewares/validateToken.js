import jwt from "jsonwebtoken";
import { config as dotenv } from "dotenv";

dotenv();
const secretToken = process.env.SECRET_TOKEN;
const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN;

export const authRequired = (req, res, next) => {
  try {
    const { refreshed } = req.cookies;

    if (!refreshed)
      return res.status(401).json({ message: "There is no token" });
    jwt.verify(refreshed, secretRefreshToken, (err, user) => {
      if (err) return res.status(401).json({ message: "Access Denied" });

      const accessToken = jwt.sign(user, secretToken);
      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 1000,
        path: "/",
      });

      req.user = user;
    });
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
