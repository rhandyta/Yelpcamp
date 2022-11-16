const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const Review = require('../models/review')
const Campground = require("../models/campground");

const { validateReview } = require("../middleware");

router.post('/', validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await campground.save()
  await review.save()
  req.flash('success', 'Adding Review Successfully')
  res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete("/:reviewId", catchAsync(async (req, res) => {
  const {id, reviewId} = req.params;
  await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Deleted Review Successfully')
  res.redirect(`/campgrounds/${id}`)
}))


module.exports = router;