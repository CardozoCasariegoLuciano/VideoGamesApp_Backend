const { Schema, model } = require("mongoose");

const videogamesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      require: true,
    },
    quantity: {
      type: Number,
    },
    image: {
      data: Buffer,
      contentType: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("VideoGames", videogamesSchema);
