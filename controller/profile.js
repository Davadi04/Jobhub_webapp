import UserSchema from "../modals/user.js";
import bcrypt from "bcryptjs";

export const editProfile = async (req, res, next) => {
  const {
    fullName,
    email,
    PhoneNumber,
    Gender,
    Location,
    Role,
    Summary,
    Experience,
    Education,
    Skills,
    Portfolio,
    Linkedin,
    CompanySize,
    AboutCompany,
    CompanyWebsite,
    id,
    Address,
    CompanyRepresentative,
  } = req.body;
  console.log(id);

  try {
    const user = await UserSchema.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    console.log(user);
    if (user.field == "customer") {
      const updatedPost = {
        fullName,
        email,
        PhoneNumber,
        Gender,
        Location,
        Role,
        Summary,
        Experience,
        Education,
        Skills,
        Portfolio,
        Linkedin,
      };

      const result = await UserSchema.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });
      res.status(200).json({ result });
    } else if (user.field == "employer") {
      const updatedPost = {
        fullName,
        email,
        Location,
        CompanySize,
        AboutCompany,
        CompanyWebsite,
        Address,
        CompanyRepresentative,
      };
      const result = await UserSchema.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });
      res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error);
  }
};

export const editPassword = async (req, res) => {
  const { id } = req.params;
  const { PassWord, newPassword } = req.body;

  try {
    const user = await UserSchema.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    const isPasswordCorrect = await bcrypt.compare(PassWord, user.PassWord);
    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Invalid Credentials" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.PassWord = hashedPassword;

    await UserSchema.findByIdAndUpdate(id, user, { new: true });

    res.status(200).send({ message: "Password Changed successfully" });
  } catch (error) {
    console.log({ message: "A Problem Occured, Try again Later" });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  await UserSchema.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
