const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to accept JSON data

// Routes
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
