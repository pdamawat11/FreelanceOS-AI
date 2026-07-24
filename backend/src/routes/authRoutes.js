import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working 🚀"
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;