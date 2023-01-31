import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import UangKasRoute from "./routes/UangKasRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import corsOptions from "./config/corsOptions.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const store = new MongoStore({
  collection: "userSessions",
  uri: process.env.DATABASE_URL,
  expires: 1000,
});

app.use(cookieParser());
app.use(
  session({
    name: "ultimacrews",
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      sameSite: 'false',
    },
    store: store
  })
);

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

app.use(UserRoute);
app.use(UangKasRoute);
app.use(AuthRoute);
app.get("/", (req, res) => {
  res.end("it works!");
});

app.listen(process.env.PORT, () => {
  console.log("Server up and running. . .");
});
