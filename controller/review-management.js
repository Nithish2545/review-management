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

const addreview = async (req, res) => {
  const reviewSchema = Joi.object({
    consignorname: Joi.string().min(1).required().messages({
      "string.empty": "Consignor name is required",
    }),
    reviewText: Joi.string().min(1).required().messages({
      "string.empty": "Review text is required",
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.integer": "Rating must be an integer",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot be more than 5",
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

export default {
  addreview: addreview,
};
