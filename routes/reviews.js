const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const reviews = require('../controllers/reviews')

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post('/', isLoggedIn , validateReview, catchAsync(reviews.store))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.destroy))


module.exports = router;