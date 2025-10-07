// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/conn");

// Routers
const mensRouter = require("./routers/mens");
const authRouter = require("./routers/auth");
const eventsRouter = require("./routers/events");
const medalStandingsRouter = require("./routers/medalStandings");
const disciplinesRouter = require("./routers/disciplines");
const countryDataRouter = require("./routers/countryDataRouter");
const athleteRouter = require("./routers/athlete");
const dashboardRouter = require("./routers/dashboardRouter");
const eventRouter = require("./routers/eventRouter");

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS — Allow all (for now)
app.use(
    cors({
      origin: ["http://localhost:3000", "https://olympics-frontend.vercel.app/"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

// ✅ Ensure DB connection before handling routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res
      .status(500)
      .send({ success: false, error: "Database connection failed" });
  }
});

// ✅ Handle invalid JSON gracefully
app.use((err, req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    return res
      .status(400)
      .send({ success: false, error: "Invalid JSON in request body" });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .send({ success: false, error: "Invalid JSON in request body" });
  }
  next(err);
});

// ✅ Mount routers
app.use("/mens", mensRouter);
app.use("/auth", authRouter);
app.use("/api/external-events", eventsRouter);
app.use("/api", medalStandingsRouter);
app.use("/api", disciplinesRouter);
app.use("/api", countryDataRouter);
app.use("/api", athleteRouter);
app.use("/api", dashboardRouter);
app.use("/api", eventRouter);

// ✅ Default route for testing
app.get("/", (req, res) => {
  res.send("🎉 Backend is live and connected to MongoDB!");
});

// ⚠️ Don’t use app.listen() — Vercel handles this automatically
module.exports = app;
