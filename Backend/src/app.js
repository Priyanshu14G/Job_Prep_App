const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`[RCVD] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
