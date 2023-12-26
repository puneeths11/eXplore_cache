/*---------------------------------------------------------------------------
Requiring
----------------------------------------------------------------------------*/
const Listing = require("./models/listing"); //requiring the listing model
const Review = require("./models/review.js"); //requiring the review model
const ExpressError = require("./utils/ExpressError.js"); //importing error
const { listingSchema } = require("./schema.js"); //schemas-JOI for server side validation
const { reviewSchema } = require("./schema.js"); //schemas-JOI for server side validation
//---------------------------------------------------------------------------------------

/*isloogedIn middleware checks wheather user is logged in or not and also stores the req.OrginalUrl with req.session.redirect*/

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect url save
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in!");
    return res.redirect("/login");
  }
  next();
};
//------------------------------------------------------------------------------------------------------

/* as after authenticate passes passport by default removes req.session information we store it in locals and we call this middleware just before the login authenticate*/

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
//--------------------------------------------------------------------------------------------------------

/* this middleware is for authorization for editing the listing*/

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next(); //if statement doesnt satisfies then calls next function to execute
};
//--------------------------------------------------------------------------------------------

/* this middleware is for authorization for deleting the middleware*/

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
//--------------------------------------------------------------------------------------------

/*Server Side Schema Validation middleware for Listings*/

module.exports.validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); //validating W.R.T schema
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
//-------------------------------------------------------------------------------------------

/*Server Side Schema Validation middleware for reviews*/

module.exports.validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); //validating W.R.T schema
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
//---------------------------------------------------------------------------------------------
