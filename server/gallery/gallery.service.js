const db = require("../_helpers/db");
const Gallery = db.Gallery;

module.exports = {
  saveImage,
  deleteImage,
  getGallery,
};

async function saveImage(req, res, next) {
  try {
    const gallery = await new Gallery({
      painter: req.user._id,
      imagePath: req.body.image,
    });
    await gallery.save();
    res.status(200).json({ message: "그림이 저장 되었습니다." });
    console.log("그림저장 오켕!");
  } catch (err) {
    next(err);
  }
}

async function deleteImage(userParam) {
  await Gallery.findByIdAndRemove(userParam);
}

async function getGallery(req, res, next) {
  try {
    const page = parseInt(req.query.page || "1", 10);
    await Gallery.find({
      painter: req.user._id,
    })
      // .sort({ _id: -1 })
      // .limit(9)
      // .skip((page - 1) * 9)
      .exec((err, gallery) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json(gallery);
      });
    console.log("겟갤러리 오켕");
  } catch (err) {
    next(err);
  }
}
