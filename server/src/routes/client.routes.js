import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { upload } from "../utils/multerConfig.js";
import { setAvatar, /*getAvatar*/ } from "../controllers/client.controller.js";

const router = Router();

router.post("/set-avatar", authRequired, upload, setAvatar);
// router.get("/get-avatar", authRequired, getAvatar);

export default router;
