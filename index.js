import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import UangKasRoute from "./routes/UangKasRoute.js"; 
import AuthRoute from "./routes/AuthRoute.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

mongoose.connect('mongodb+srv://bella:bellacantik@umnradio.5g0zvgm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'https://backend-ultimacrews-project-fj9kgzqgu-bellashrns.vercel.app'
}))
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(UserRoute);
app.use(UangKasRoute);
app.use(AuthRoute);

app.listen('process.env.PORT', ()=>{
    console.log("Server up and running. . .");
});