const express = require("express");
const router = express.Router();

/*------------------------------------------------------------------------------
Requiring
-------------------------------------------------------------------------------*/
const wrapAsync = require("../utils/wrapAsync.js"); //wrapAsync to use try catch for defined routes
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js"); //middlewares
const listingController = require("../controllers/listings.js"); //controller (core function)
const multer = require("multer"); //image upload library
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //image upload parse for backend

/*----------------------------------------------------------------
Routing    
-----------------------------------------------------------------*/

//->Index,Create :Route
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"), //middleware (multer parse,cloudinary save)
  validatelisting,
  wrapAsync(listingController.createListing)
);

//->New :Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//->Show,Update(edited),delete :Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), //middleware (multer parse,cloudinary save)
    validatelisting,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destoryListing));

//->Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

/*-------------------------------
Exporting
-------------------------------*/
module.exports = router;

//----------------------------Reference---Create Route----------------------------------------
// router.post(
//   "/listings",
//   wrapAsync(async (req, res, next) => {

//     /*One method to extract the information
//     let {title, description, image, price, country, location} = req.body;
//     */

//     /*Second method in new ejs making names into an object with a key(using[] new.ejs listing[] and creating new instance)*/
//     // let listing = req.body.listing;

//     /*new Listing(listing); //new instance for listing object*/
//     // if (!req.body.listing) {
//     //   throw new ExpressError(400, "Send Valid data for listing");
//     // }

//     const newListing = new Listing(req.body.listing);
//     // if (!newListing.title) {
//     //   throw new ExpressError(400, "Title is missing");
//     // }
//     // if (!newListing.description) {
//     //   throw new ExpressError(400, "Description is missing");
//     // }
//     // if (!newListing.location) {
//     //   throw new ExpressError(400, "location is missing");
//     // }
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );
//----------------------------------------------------------------------------------------------
