import admin from "firebase-admin";
import Joi from "joi";
import calculateIncentive from "../Utilis/incentiveCal.js";
import ratingDistribution from "../Utilis/ratingDistribution.js";
import { db } from "../firebase.js";

// ======================== ADD REVIEW ========================
export const addreview = async (req, res) => {
  const reviewSchema = Joi.object({
    consignorname: Joi.string().min(1).required().messages({
      "string.empty": "Consignor name is required",
    }),
    reviewText: Joi.string().allow("").required().messages({
      "string.base": "Review text must be a string",
    }),
    awbHashedValue: Joi.string().min(1).required().messages({
      "string.empty": "AWB hashed value is required",
    }),
    awbNumber: Joi.number().integer().min(1000).max(9999).required().messages({
      "number.base": "AWB number must be a number",
      "number.integer": "AWB number must be an integer",
      "number.min": "AWB number must be exactly 4 digits",
      "number.max": "AWB number must be exactly 4 digits",
    }),
    ratings: Joi.object({
      packing: Joi.number().integer().min(1).max(5).required(),
      timeliness: Joi.string().valid("Yes", "No").required().messages({
        "any.only": "Timeliness must be either 'Yes' or 'No'",
      }),
      dressCode: Joi.string().valid("Yes", "No").required().messages({
        "any.only": "Dress code must be either 'Yes' or 'No'",
      }),
      overallRating: Joi.number().integer().min(1).max(5).required(),
    })
      .required()
      .messages({
        "object.base": "Ratings must be a valid object",
        "any.required": "Ratings are required",
      }),
    pickUpPersonName: Joi.string().min(3).required().messages({
      "string.empty": "Pickup person name is required",
    }),
    City: Joi.string().min(3).required().messages({
      "string.empty": "City is required",
    }),
    incentiveStatus: Joi.string().valid("PENDING").required().messages({
      "any.only": "Incentive status must be 'PENDING'",
      "string.empty": "Incentive status is required",
    }),
    reviewSource: Joi.string().min(3).required().messages({
      "string.empty": "Review source is required",
    }),
  });

  const { error, value } = reviewSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => ({
        field: err.context.key,
        message: err.message,
      })),
    });
  }

  const incentiveInfo = calculateIncentive(value.ratings);

  try {
    const existingQuery = await db
      .collection("reviews")
      .where("awbNumber", "==", value.awbNumber)
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      return res.status(409).json({
        message: "Review already exists for this shipment",
      });
    }

    const snapshot = await db
      .collection("pickup")
      .where("awbHashedValue", "==", value.awbHashedValue)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const reviewRef = await db.collection("reviews").add({
      pickupBookedBy: data[0].pickupBookedBy,
      logisticCost: data[0].logisticCost,
      ...value,
      ...incentiveInfo,
      reviewCreatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isReviewSent: true,
    });

    return res.status(201).json({
      message: "Review saved successfully",
      id: reviewRef.id,
      data: value,
    });
  } catch (err) {
    console.error("Error saving review:", err);
    return res.status(500).json({ message: "Failed to save review" });
  }
};

// ======================== GET ALL REVIEWS ========================
const getAllreviews = async (req, res) => {
  try {
    const { awbHash } = req.body;
    const existingQuery = await db
      .collection("reviews")
      .where("awbHashedValue", "==", awbHash)
      .get();

    if (!existingQuery.empty) {
      return res.status(409).json({
        message: "Review already exists for this shipment",
      });
    }

    return res.status(200).json(existingQuery.docs.map((doc) => doc.data()));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

// ======================== GET PICKUP BY HASH ========================
const getPickupByAwbHashValue = async (req, res) => {
  const { awbHash } = req.body;

  if (!awbHash) {
    return res.status(400).json({ message: "awbHash is required" });
  }

  try {
    const snapshot = await db
      .collection("pickup")
      .where("awbHashedValue", "==", awbHash)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ shipment: data[0] });
  } catch (error) {
    console.error("Error fetching shipment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ======================== GET DASHBOARD DATA ========================
const getReviewDashboardData = async (req, res) => {
  try {
    const snapshot = await db.collection("reviews").get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const total = data.reduce(
      (sum, item) => sum + item.ratings.overallRating,
      0
    );

    const averageRatings =
      data.length === 0 ? 0 : parseInt(total / data.length);

    const dataset = {
      reviews: data,
      totalReviews: data.length,
      averageRatings: averageRatings,
      ratingDistribution: ratingDistribution(data),
    };

    return res.status(200).json(dataset);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  addreview,
  getAllreviews,
  getPickupByAwbHashValue,
  getReviewDashboardData,
};
