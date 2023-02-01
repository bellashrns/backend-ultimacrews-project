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
app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESS_SECRET,
		resave: true,
		saveUninitialized: true,
		name: "userId",
		proxy: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 48,
			secure: true,
			sameSite: "none",
			httpOnly: true, // dont let browser javascript access cookie ever
			ephemeral: true,
			// delete this cookie while browser close
		},
		store: new MongoStore({
			mongoUrl: process.env.DATABASE_URL,
			collection: "sessions",
		}),
	})
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public/images")));

app.use(UserRoute);
app.use(UangKasRoute);
app.use(AuthRoute);
app.get("/", (req, res) => {
	res.end("it works!");
});

app.listen(process.env.PORT, () => {
	console.log("Server up and running. . .");
});
