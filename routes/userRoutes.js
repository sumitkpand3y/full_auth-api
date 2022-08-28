import  express  from "express";
const router = express.Router();

import UserController from '../controllers/userControllers.js'
import checkUserAuth from "../middlewares/auth-middlewares.js";

//router Level Middleware

router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)
//Public  Routes
router.post('/register', UserController.userRegistration)
router.post("/login", UserController.userLogin);
router.post("/send-reset-password-email", UserController.sendUserPasswordResetEmail);
router.post(
  "/reset-password/:id/:token",
  UserController.userPasswordReset
);

 
//Protected Routes

router.post("/changepassword", UserController.changeUserPassword);
router.post("/loggeduser", UserController.loggedUser);

export default router