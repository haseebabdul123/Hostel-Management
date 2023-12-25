import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import checkUserAuth from "../middleWares/auth-middleware.js";

//router.post('/changepassword', checkUserAuth)
//router.get('/loggeduser', checkUserAuth)

router.post("/register", UserController.registerController);
router.post("/login", UserController.loginController);

router.post("/getUserData", checkUserAuth, UserController.authController);
export default router;
