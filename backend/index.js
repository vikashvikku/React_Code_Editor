import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import v1Router from "./src/routes/v1/v1.router.js";
import { RequestLoggerMiddleware } from "./src/middlewares/requestlogger.middleware.js";
import { connectToDB } from "./src/db/db.js";

dotenv.config();


const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

const server = express();

const allowedOrigins = [
  "http://localhost:3000", // CRA default
  "http://localhost:5173", // Vite default
  "http://127.0.0.1:5173",
  "https://react-code-editor-wkll.vercel.app",
];

server.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or server-side calls)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(` CORS blocked request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

server.options("*", cors());

server.use(express.json());
server.use(RequestLoggerMiddleware);

server.use("/api/v1", v1Router);

server.get("/", (req, res) => {
  res.send(" CipherStudio Backend is running successfully!");
});
// ================================

// ============ Start Server ============
async function startServer() {
  try {
    await connectToDB();

    server.listen(PORT, "0.0.0.0", () => {
      console.log(
        ` Server running in ${NODE_ENV} mode on http://0.0.0.0:${PORT}`
      );
    });
  } catch (error) {
    console.error(" Error while starting the server:", error);
  }
}

startServer();
