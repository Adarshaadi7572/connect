const express = require("express");
const router = express.Router();
const {auth, isProfessional, isAdmin} = require("../middlewares/auth");
const {signup, login, otpsend } = require("../controllers/user_controller");
const User = require("../modals/user_profile");

router.post("/user_login", login);
// router.post("/admin_login", login);
router.post("/user_signup", signup);
router.post("/sendOTP", otpsend )
router.put("/details/:id", auth, isProfessional, userDetails);

module.exports = router;