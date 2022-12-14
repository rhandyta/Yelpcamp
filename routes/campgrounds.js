const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage})

router
    .route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.store));

router.get("/new", isLoggedIn, campgrounds.new);

router
    .route("/:id")
    .get(catchAsync(campgrounds.show))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.update)
    )
    .delete(isAuthor, isLoggedIn, catchAsync(campgrounds.destroy));


router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

module.exports = router;
