const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    painter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imagePath: {
      src: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", schema);
