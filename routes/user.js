const express = require("express");
const router = express.Router();
/*---------------------------------------------------------------------
Requiring
-----------------------------------------------------------------------*/
const wrapAsync = require("../utils/wrapAsync"); //wrapasync try catch
const passport = require("passport"); //passport
const { saveRedirectUrl } = require("../middleware.js"); //accessing the url
const usersController = require("../controllers/users.js"); //controller

/*----------------------------------------------------------------
Routing    
-----------------------------------------------------------------*/
//Signup
router
  .route("/signup")
  .get(usersController.renderSignupForm)
  .post(wrapAsync(usersController.signup));

//Login
router
  .route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.login
  );
//passport.authenticate() is a middleware to authenticate user with DB(route,middleware,functn)

//Logout
router.get("/logout", usersController.logout);

router.get("/", (req, res) => {
  res.redirect("/listings");
});

/*------------------------------------------
Exporting
-------------------------------------------*/
module.exports = router;
