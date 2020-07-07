const db = require("../_helpers/db");
const Gallery = db.Gallery;

module.exports = {
  saveImage,
  deleteImage,
  getGallery,
  getImageDetail,
};

async function saveImage(userParam) {
  const gallery = await new Gallery(userParam);
  await gallery.save();
  // await gallery.save((err, gallery) => {
  //   if (err)
  //     return res.status(400).json({
  //       message:
  //         "Image information could not be saved due to incorrect or problem information",
  //     });
  //   return res.status(200).json({ message: "save success", gallery });
  // });
}

async function deleteImage(userParam) {
  await Gallery.findByIdAndRemove(userParam);
}

async function getGallery(userParam) {
  return await Gallery.find({ _id: userParam._id })
    .popluate("painter")
    .exec((err, gallery) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(gallery);
    });
}

async function getImageDetail(userParam) {
  return await Gallery.findOne({ _id: userParam.imageId });
}
