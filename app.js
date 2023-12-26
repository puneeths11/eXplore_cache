/*----------------------------------------------------------------
Requring and defining
--------------------------------------------------------------------*/

//.env
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express"); //express
const app = express(); //defining
const mongoose = require("mongoose"); //mongoose
const path = require("path"); //path join
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //ejs mate (header footer)
const ExpressError = require("./utils/ExpressError.js"); //importing error
const session = require("express-session"); //express session required
const MongoStore = require(`connect-mongo`); //mongo session required
const flash = require("connect-flash"); //flash require
const passport = require("passport"); //passport
const LocalStrategy = require("passport-local"); //local passport strategy
const User = require("./models/user.js"); //user model
//-----routes-------------------------------------------------
const listingRouter = require("./routes/listing.js"); //listings routes
const reviewRouter = require("./routes/review.js"); //reviews routes
const userRouter = require("./routes/user.js"); //user routes

//--------------------------------------------------------------------

/*------------------------------------------------------------------
Defining the Database
--------------------------------------------------------------------*/
// const MONGO_URL = "mongodb://127.0.0.1:27017/explorecache";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}
//----------------------------------------------------------------------

/*----------------------------------------------------------------
Setting app
-----------------------------------------------------------------*/
app.set("view engine", "ejs"); //using ejs (views folder)
app.set("views", path.join(__dirname, "views")); //path join
app.use(express.urlencoded({ extended: true })); // to parse data from url or req.body
app.use(methodOverride("_method")); // to use put patch methods
app.engine("ejs", ejsMate); // to use ejs-mate
app.use(express.static(path.join(__dirname, "/public"))); //public folder for CSS JS functionality

/*----------------------------------------------------------------
 options
-----------------------------------------------------------------*/
//mongodb session options
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

//express session options
const sessionOptions = {
  store, //mongodb store info
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//->Root Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Root");
// });

//->Sessions & flash
app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//session middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//demo user for passport
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "student001",
//   });
//   let registerUser = await User.register(fakeUser, "thisispassword");
//   //register is static method that register new instance with given password also check username is unique or not
//   res.send(registerUser);
// });

//listings Route's
app.use("/listings", listingRouter);

//reviews Route's
app.use("/listings/:id/reviews", reviewRouter);

//User Route's
app.use("/", userRouter);

//->Testing Route
// app.get("/testinglist", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the Beach",
//     price: 1200,
//     location: "Calangute,Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("successful testing");
// });

/*----------------------------------------------------------
Error/Middlewares
------------------------------------------------------------*/
//If None of the Route match the request then below route is sent
app.all("*", (req, res, next) => {
  res.status(404).render("listings/pagenotfound");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("./listings/error.ejs", { message });
  // console.log(err);
  // console.log(message);
  // res.status(status).send(message);
});

/*----------------------------------------------------------
Defining the Port 
------------------------------------------------------------*/
app.listen(8080, () => {
  console.log("Server is Listening to the Port Number 8080");
});
//----------------------------------------------------------
