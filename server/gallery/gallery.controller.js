const express = require("express");
const router = express.Router();
const galleryService = require("./gallery.service");

//routers
router.post("/saveImage", saveImage);
router.delete("/:id", deleteImage);
router.get("/", getGallery);
router.get("/:id", getImageDetail);

module.exports = router;

function saveImage(req, res) {
  galleryService
    .saveImage(req.body)
    .then((gallery) =>
      gallery
        ? res.json(gallery)
        : res
            .status(400)
            .json({
              message:
                "Image information could not be saved due to incorrect or problem information",
            })
    )
    .catch((err) => next(err));
}

function deleteImage(req, res, next) {
  galleryService
    .deleteImage(req.body)
    .then((gallery) => (gallery ? res.json(gallery) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getGallery(req, res, next) {
  galleryService
    .getGallery(req.body)
    .then((gallery) => res.status(200).json(gallery))
    .catch((err) => next(err));
}

function getImageDetail(req, res, next) {
  galleryService
    .getImageDetail(req.body)
    .then((gallery) => (gallery ? res.json(gallery) : res.sendStatus(404)))
    .catch((err) => next(err));
}
