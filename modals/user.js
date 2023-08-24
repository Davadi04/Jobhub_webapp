import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  field: { type: String },
  fullName: { type: String },
  email: {
    type: String,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  PhoneNumber: { type: String },
  PassWord: { type: String },
  DateOfBirth: { type: Date, default: Date.now() },
  Gender: { type: String },
  CompanyRepresentative: { type: String },
  Nationality: { type: String },
  CurentPosition: { type: String },
  bio: { type: String },
  CompanySize: { type: String },
  SavedItemArray: { type: Array, default: [] },
  ViewAppliedCV: { type: Array, default: [] },
  ApplySavedJobs: { type: Array, default: [] },
  AboutCompany: { type: String },
  CompanyWebsite: { type: String },
  Address: { type: String },
  verified: { type: Boolean, default: false },
  OfficeAddress: { type: String },
  companyEmail: { type: String },
  website: { type: String },
  companyName: { type: String },
  Portfolio: { type: String },
  Linkedin: { type: String },
  industry: { type: String },
  Location: { type: String },
  numberOfEmployee: { type: String },
  typeOfEmployer: { type: String },
  highestQualification: { type: String },
  yearsOfExperience: { type: String },
  currentWork: { type: String },
  avaliability: { type: String },
  Role: { type: String },
  Summary: { type: String },
  Experience: { type: String },
  Education: { type: String },
  Skills: { type: String },
  uploadCv: { type: String },
});

let UserSchema =
  mongoose.models.UserSchema || mongoose.model("UserSchema", userSchema);

export default UserSchema;
