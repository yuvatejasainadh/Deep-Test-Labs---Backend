import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

// 🔧 Force IPv4 first (fixes MongoDB Atlas SRV issues on Windows networks)
dns.setDefaultResultOrder("ipv4first");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Deep Test Labs API Running 🚀");
});

const PORT = process.env.PORT || 4000;

// 🧠 Recommended mongoose settings
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "deeptestlabs_v1", // ensure DB is selected
    family: 4,                 // force IPv4
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });
