import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import DB_CONN from "./config/DBConnection.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/todos", taskRoute);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, message });
});

const PORT = process.env.PORT || 3202;

app.listen(PORT, () => {
  DB_CONN();
  console.log(`Server is running on port ${PORT}.`);
});
