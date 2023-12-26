const User = require("../models/user.js"); //user model

//signup render form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

//signup
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to eXplore-cache!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//login render form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

//login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back to eXplore-cache!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have Logged out!");
    res.redirect("/listings");
  });
};
