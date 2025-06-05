import admin from "firebase-admin";
import Joi from "joi";

import { readFile } from "fs/promises";
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url))
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const runTask = async (name, phoneNumber) => {
  console.log("Run task!");
};

export const addreview = async (req, res) => {
  const reviewSchema = Joi.object({
    consignorname: Joi.string().min(1).required().messages({
      "string.empty": "Consignor name is required",
    }),
    reviewText: Joi.string().min(1).required().messages({
      "string.empty": "Review text is required",
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
    overallRating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "Overall rating must be a number",
      "number.integer": "Overall rating must be an integer",
      "number.min": "Overall rating must be at least 1",
      "number.max": "Overall rating cannot be more than 5",
    }),
    ratings: Joi.object({
      packing: Joi.number().integer().min(1).max(5).required(),
      timeliness: Joi.number().integer().min(1).max(5).required(),
      dressCode: Joi.number().integer().min(1).max(5).required(),
    })
      .required()
      .messages({
        "object.base": "Ratings must be a valid object",
        "any.required": "Ratings are required",
      }),
    reviewCreatedAt: Joi.string().allow("").required().messages({
      "string.base": "Review created at must be a string",
      "any.required": "Review created at is required",
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

    const reviewRef = await db.collection("reviews").add({
      ...value,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(201).json({
      message: "Review saved successfully",
      id: reviewRef.id,
      data: value,
    });
  } catch (err) {
    console.error("Firestore error:", err);
    return res.status(500).json({ message: "Failed to save review" });
  }
};

const getAllreviews = async (req, res) => {
  try {
    const snapshot = await db.collection("reviews").get();

    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

export default {
  addreview: addreview,
  getAllreviews: getAllreviews,
};
