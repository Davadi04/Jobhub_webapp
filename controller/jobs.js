import JobsSchema from "../modals/jobs.js";
import UserSchema from "../modals/user.js";

export const jobsPost = async (req, res) => {
  const {
    id,
    jobRole,
    jobSummary,
    EmploymentType,
    WorkType,
    jobPay,
    CityOfJob,
    jobLocation,
    ExperienceLevel,
    jobDescription,
    jobRequirement,
    coreSkills,
    softSkills,
    jobEndDate,
    numberEmploy,
    saveditem,
  } = req.body;

  try {
    const result = await new JobsSchema({
      ...req.body,
    }).save();

    res.status(200).json({
      result,
      message: "Job Post Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetJobsPosts = async (req, res) => {
  try {
    const posts = await JobsSchema.find().sort({ _id: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetViewItemPage = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const posts = await JobsSchema.findById({ _id: id });
    console.log(posts);
    res.status(200).json({ posts });
  } catch (error) {}
};

export const GetPostBySearch = async (req, res) => {
  const { searchInput } = req.query;

  const jobRole = new RegExp(searchInput, "i");

  try {
    const posts = await JobsSchema.find({
      $or: [{ jobRole }],
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteJobPost = async (req, res) => {
  const { index } = req.params;

  await JobsSchema.findByIdAndRemove(index);

  res.json({ message: "Post deleted successfully." });
};

export const saveItemFunc = async (req, res) => {
  const {
    coreSkills,
    softSkills,
    jobEndDate,
    saveditem,
    jobRequirement,
    jobDescription,
    jobPay,
    ExperienceLevel,
    jobLocation,
    CityOfJob,
    WorkType,
    EmploymentType,
    jobSummary,
    jobRole,
    email,
    id,
    _id,
    userId,
  } = req.body;

  const user = await UserSchema.findOne({ email });

  if (user.SavedItemArray.find((val) => val._id == _id)) {
    res.status(404).json({ message: "Job Already Saved" });
  } else {
    user?.SavedItemArray.push(req.body);
    await UserSchema.findByIdAndUpdate(userId, user, {
      new: true,
    });
    res.status(200).send({ message: "Item saved successfully" });
    console.log(user);
  }
  // user?.SavedItemArray.push(req.body);
  // res.status(200).send({ message: "Item saved successfully" });
};

export const GetApplyFunc = async (req, res) => {
  try {
    const user = await UserSchema.findById({ _id: req.body.id });
    const jobseekerUser = await UserSchema.findById({ _id: req.body.userId });

    if (user.field == "employer") {
      if (user?.ViewAppliedCV.find((val) => val._id == req.body.userId)) {
        res.status(404).json({ message: "Already Applied" });
      } else {
        user?.ViewAppliedCV.push(jobseekerUser);

        await UserSchema.findByIdAndUpdate(req.body.id, user, {
          new: true,
        });
        console.log(user);
        res.status(200).json({ user });
      }
    }

    if (jobseekerUser.field == "customer") {
      if (
        jobseekerUser?.ApplySavedJobs.find((val) => val._id == req.body._id)
      ) {
        res.status(404).json({ message: "Already Applied" });
      } else {
        jobseekerUser?.ApplySavedJobs.push(req.body);

        await UserSchema.findByIdAndUpdate(req.body.userId, jobseekerUser, {
          new: true,
        });

        res.status(200).json({ jobseekerUser });
      }
    }

    console.log(user, jobseekerUser);
  } catch (error) {}
};
