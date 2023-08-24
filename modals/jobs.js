import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  id: { type: String },
  jobRole: { type: String },
  jobSummary: { type: String },
  EmploymentType: { type: String },
  WorkType: { type: String },
  CityOfJob: { type: String },
  jobLocation: { type: String },
  jobPay: { type: String },
  ExperienceLevel: { type: String },
  jobDescription: { type: String },
  jobRequirement: { type: String },
  coreSkills: { type: String },
  softSkills: { type: String },
  jobEndDate: { type: String },
  numberEmploy: { type: String },
  saveditem: { type: Boolean, default: false },
});

let JobsSchema =
  mongoose.models.JobsSchema || mongoose.model("JobsSchema", jobsSchema);

export default JobsSchema;
