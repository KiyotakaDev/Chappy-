import { Router } from "express";
import {
  register,
  login,
  allContacts,
  logout,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-contacts/:id", authRequired, allContacts);
router.post("/logout", logout);

export default router;
