// // To use user.controller.js we make the user.router.js.

import express from "express";
import { login, logout, signup } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);  // // Here we followed post method because through server we are maniplating in the clinet side. You can also use get method too.

export default router;





