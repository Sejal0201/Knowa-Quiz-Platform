
// require("dotenv").config();
// const authRoutes =
//   require(
//     "./routes/authRoutes"
//   );
// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// // connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(
//   "/api/auth",
//   authRoutes
// );

// const quizRoutes =
//   require(
//     "./routes/quizRoutes"
//   );

// app.use(
//   "/api/quiz",
//   quizRoutes
// );

// app.get("/", (req, res) => {
//   res.send("Welcome to Knowa Quiz Platform API");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// app.get("/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Backend Working",
//   });
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to BetterMind Labs API");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});