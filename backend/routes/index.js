const express = require("express");
const userRegister = require("../controller/userController.js");
const emailVerification = require("../controller/emailVerification.js");
const userLogin = require("../controller/userLoginController.js");
const userLogout = require("../controller/userLogout.js");
const isAuth = require("../middleware/isAutheticted.js");
const forgotPassword = require("../controller/forgotPassword.js");
const otpVerify = require("../controller/otpVerify.js");
const changePassword = require("../controller/changePassword.js");
const { userValidator, userSchema } = require("../validator/foamValidation.js");
const verifyEmail = require("../controller/emailVerification.js");


const router = express.Router();

{
  /* user registration */
}
router.post("/register", userRegister);
{
  /* email verification */
}
router.get("/verify/:token", verifyEmail);

{
  /* user login */
}
router.post("/login", userLogin);
{
  /* user logout */
}
router.post("/logout", isAuth, userLogout);
{
  /* forgot password */
}
router.post("/forgot-password", forgotPassword);
{
  /* otp verify */
}
router.post("/verify-otp/:email", otpVerify);
{
  /* change password */
}
router.post("/change-password/:email", changePassword);

/*//////////////////
Product route
//////////////////*/
{/*Add Product */}

module.exports = router;
