import express from "express";
import {
  jobsPost,
  GetJobsPosts,
  DeleteJobPost,
  saveItemFunc,
  GetPostBySearch,
  GetViewItemPage,
  GetApplyFunc,
} from "../controller/jobs.js";
const router = express.Router();

router.post("/post", jobsPost);
router.get("/getPosts", GetJobsPosts);
router.get("/getSearchPost", GetPostBySearch);
router.delete("/delete/:index", DeleteJobPost);
router.get("/vieweditemPage/:id", GetViewItemPage);
router.post("/saveItem", saveItemFunc);
router.post("/applyItem", GetApplyFunc);

export default router;
