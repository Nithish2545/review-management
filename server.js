import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import review from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: "*", // Allows all origins, can be replaced with a specific domain
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(helmet());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use("/api/v1", review);

app.get("/", (req, res) => {
  res.send("Review management | Status: Online | Last Updated: Sept 18, 2025");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
