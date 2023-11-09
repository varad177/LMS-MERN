import { Router } from "express";
import { forgotPassword, getProfile, login, logout, resetPassword, resister , changepassword , updateuser} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { sendContactMessage } from "../controllers/other.controller.js";

const router = Router()


// resister
router.post("/resister", upload.single('avatar') , resister);

// login
router.post("/login" , login);

//logout
router.get("/logout" , logout);

//to show profile
router.get("/me/:id", getProfile);

router.post('/reset' , forgotPassword);

router.post('/reset/:resetToken' , resetPassword);
router.post('/change-password' , isLoggedIn , changepassword);
router.put('/update/:id'   , updateuser)
router.post('/contact' , sendContactMessage)

export default router