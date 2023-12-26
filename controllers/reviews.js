const Listing = require("../models/listing"); //listing model
const Review = require("../models/review"); //review model

//createreview
module.exports.createReview = async (req, res) => {
  //function wrapasync try catch err handler
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review); //review object review[rating]->show.ejs
  newReview.author = req.user._id; //author of the review
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

//deletereview
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  // res.send(reviewId); -> to Know the Path
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
