const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router.get(
    "/",
    catchAsync(campgrounds.index)
);

router.get("/new", isLoggedIn, campgrounds.new);

router.post(
    "/",
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.store)
);

router.get(
    "/:id",
    catchAsync(campgrounds.show)
);

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.edit)
);

router.put(
    "/:id",
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.update)
);

router.delete(
    "/:id",
    isAuthor,
    isLoggedIn,
    catchAsync(campgrounds.destroy)
);

module.exports = router;
