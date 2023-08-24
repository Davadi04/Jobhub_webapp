import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSchema from "../modals/user.js";
import { sendEmail } from "../utiles/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

export const signIn = async (req, res) => {
  const { email, PassWord } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      PassWord,
      existingUser.PassWord
    );

    // const passwordCheck = await bcrypt.compare(PassWord , existingUser.PassWord)
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const jwttoken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "30d" }
    );
    console.log("see");

    res.status(200).json({
      result: existingUser,
      jwttoken,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const customerSignUp = async (req, res) => {
  const {
    fullName,
    field,
    verified,
    email,
    PhoneNumber,
    PassWord,
    DateOfBirth,
    Gender,
    Nationality,
    CountryCode,
    Location,
    highestQualification,
    yearsOfExperience,
    currentWork,
    avaliability,
    uploadCv,
  } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    // if (password !== confirmPassword) return res.status(400).json({message: "Password doesn't match"})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PassWord, salt);

    const result = await new UserSchema({
      ...req.body,
      PassWord: hashedPassword,
    }).save();

    const jwttoken = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "30d",
    });

    res.status(200).json({
      result,
      jwttoken,
      message: "An Email sent to your account please verify",
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const employerSignUp = async (req, res) => {
  const {
    fullName,
    field,
    email,
    CompanyRepresentative,
    verified,
    PhoneNumber,
    PassWord,
    DateOfBirth,
    Gender,
    Nationality,
    CountryCode,
    Location,
    OfficeAddress,
    companyEmail,
    website,
    companyName,
    industry,
    numberOfEmployee,
    typeOfEmployer,
  } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    // if (password !== confirmPassword) return res.status(400).json({message: "Password doesn't match"})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PassWord, salt);

    const result = await new UserSchema({
      ...req.body,
      PassWord: hashedPassword,
    }).save();

    const jwttoken = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "30d",
    });

    console.log("Employer");

    res.status(200).json({
      result,
      jwttoken,
      message: "An Email sent to your account please verify",
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const GetProfileData = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findOne({ _id: id });
    res.status(200).json({
      result: user,
    });

    console.log(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    //   const token = await TokenSchema.findOne({
    //		userId: user._id,
    //		token: req.params.token,
    //	});
    //   if (!token) return res.status(400).send({ message: "Invalid link" });

    // await UserSchema.updateOne({ _id: user._id, verified: true });
    //  await token.remove();
    user.verified = true;

    await UserSchema.findByIdAndUpdate(id, user, { new: true });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const createAccount = async (req, res) => {
  const {
    id,
    PhoneNumber,
    DateOfBirth,
    bio,
    Gender,
    Location,
    Education,
    CurentPosition,
    Experience,
    Skills,
    yearsOfExperience,
    uploadCv,
    Portfolio,
    Linkedin,
    CompanySize,
    AboutCompany,
    CompanyWebsite,
    Address,
    SavedItemArray,
  } = req.body;

  try {
    const user = await UserSchema.findOne({ _id: id });

    if (user.field == "customer") {
      const updatedPost = {
        PhoneNumber,
        DateOfBirth,
        bio,
        Gender,
        Location,
        Education,
        CurentPosition,
        Experience,
        Skills,
        yearsOfExperience,
        uploadCv,
        Portfolio,
        Linkedin,
        SavedItemArray,
      };

      const result = await UserSchema.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });

      const jwttoken = jwt.sign({ email: user.email, id: user._id }, "test", {
        expiresIn: "30d",
      });

      res.status(200).json({ result, jwttoken });
    } else if (user.field == "employer") {
      const updatedPost = {
        Location,
        CompanySize,
        AboutCompany,
        CompanyWebsite,
        Address,
      };

      const result = await UserSchema.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });

      const jwttoken = jwt.sign({ email: user.email, id: user._id }, "test", {
        expiresIn: "30d",
      });
      console.log(result);
      res.status(200).json({ result, jwttoken });
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetApplyJobs = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById({ _id: id });
    res.status(200).json({
      result: user,
    });

    console.log(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
