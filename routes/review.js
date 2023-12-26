const express = require("express");
const router = express.Router({ mergeParams: true });

/*----------------------------------------------------------------
Requiring
-----------------------------------------------------------------*/
const wrapAsync = require("../utils/wrapAsync.js"); //wrapAsync to use try catch for defined routes
const {
  validatereview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js"); //middlewares
const reviewController = require("../controllers/reviews.js"); //controller

/*-------------------------------------------------------------------------
Routing   
-------------------------------------------------------------------------*/
//Add Review post Route
/*post route - only access with listing not indvidual get route so we implemented post rout directly*/
router.post(
  "/", //route
  validatereview, //middleware
  isLoggedIn, //checks wheather the user is loggedin or not
  wrapAsync(reviewController.createReview)
);

//Delete Review post Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

/*-------------------------------
Exporting
-------------------------------*/
module.exports = router;
