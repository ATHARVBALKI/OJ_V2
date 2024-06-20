const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const PORT = process.env.PORT || 4000;

const cors = require("cors");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoutes = require("./routes/User");
const problemRoutes = require("./routes/Problem");

//database connect
database.connect();
//middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173", 
  "https://www.coderuler.online"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//def route
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/problems", problemRoutes);

app.get("/", (req, res) => {
  res.json({ online: 'compiler' });
});

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
