import express from "express";
import {
  customerSignUp,
  signIn,
  verifyEmail,
  employerSignUp,
  createAccount,
  GetProfileData,
  GetApplyJobs,
} from "../controller/user.js";
import {
  editProfile,
  deleteAccount,
  editPassword,
} from "../controller/profile.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/customer/signUp", customerSignUp);
router.post("/finalSetup", createAccount);
router.post("/employer/signUp", employerSignUp);
router.get("/:id/verify", verifyEmail);
router.get("/home/:id", GetProfileData);
router.get("/applyjobs/:id", GetApplyJobs);
router.patch("/accountsetting/:id", editProfile);
router.patch("/security/:id", editPassword);
router.delete("/delete/:id", deleteAccount);
export default router;
