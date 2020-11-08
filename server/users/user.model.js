const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

module.exports = mongoose.model("User", UserSchema);
