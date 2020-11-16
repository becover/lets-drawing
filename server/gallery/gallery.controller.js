const express = require("express");
const isAuth = require("../auth/isAuth");
const router = express.Router();
const galleryService = require("./gallery.service");

//routers
router.post("/saveImage", isAuth, galleryService.saveImage);
router.post("/deleteImage", isAuth, galleryService.deleteImage);
router.post("/", isAuth, galleryService.getGallery);

module.exports = router;
