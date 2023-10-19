import jwt from "jsonwebtoken";
import { config as dotenv } from "dotenv";

dotenv();
const secretToken = process.env.SECRET_TOKEN;
const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN;

export const createAccestokens = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretToken, { expiresIn: "60s" }, (err, accessToken) => {
      if (err) return reject(err);

      jwt.sign(
        payload,
        secretRefreshToken,
        { expiresIn: "7d" },
        (err, refreshToken) => {
          if (err) return reject(err);

          return resolve({ accessToken, refreshToken });
        }
      );
    });
  });
};
