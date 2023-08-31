import express from "express";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import LoginRoute from "./routes/login.routes.js";
import ForgotRoute from "./routes/forgot.routes.js";
import SignupRoute from "./routes/signup.routes.js";
import SessionRoute from "./routes/session.routes.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import * as dotenv from "dotenv";

import __dirname from "./utils.js";

dotenv.config();
const app = express();
app.use(cookieParser("C0d3rS3cr3t"));

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 30,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const environment = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

environment();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/forgot", ForgotRoute);
app.use("/api/sessions/", SessionRoute);

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

server.on("error", (err) => {
  console.error(err);
});