import express from "express";

import reviewmanagement from "../controller/review-management.js";
const router = express.Router();

router.route("/addReview").post(reviewmanagement.addreview);
router.route("/getAllreviews").post(reviewmanagement.getAllreviews);
router
  .route("/getPickupByAwbHashValue")
  .post(reviewmanagement.getPickupByAwbHashValue);
export default router;
