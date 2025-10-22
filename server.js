require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const foodroutes = require("./routes/foodroutes");
app.use("/api/foods", foodroutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
