// ============ Imports ============
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import v1Router from "./src/routes/v1/v1.router.js";
import { RequestLoggerMiddleware } from "./src/middlewares/requestlogger.middleware.js";
import { connectToDB } from "./src/db/db.js";

dotenv.config();
// =================================

// ========== ENVIRONMENT VARIABLES ==========
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
// =========================================

// ============ Server ============
const server = express();

// ✅ Strong CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // CRA default
  "http://localhost:5173", // Vite default
  "http://127.0.0.1:5173",
];

server.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Automatically respond to preflight (OPTIONS) requests
server.options("*", cors());

// ✅ JSON + logging middleware
server.use(express.json());
server.use(RequestLoggerMiddleware);

// ============ Routes ============
server.use("/api/v1", v1Router);
// ================================

// ============ Start Server ============
async function startServer() {
  try {
    await connectToDB(); // connect to db
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} [${NODE_ENV}]`);
    });
  } catch (error) {
    console.error(`❌ Error while starting the server:`, error);
  }
}

startServer();
// ================================
