const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 0,
    },
    inventory: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);



UserSchema.statics.encriptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(password, salt);
  return encriptedPassword;
};

UserSchema.statics.comparePasswords = async (
  plainPassword,
  encriptedPassword
) => {
  return await bcrypt.compare(plainPassword, encriptedPassword);
};


module.exports = model("User", UserSchema);
