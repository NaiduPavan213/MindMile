const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    kind: { type: String, enum: ["image", "video"], required: true },
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // store a denormalized author name for quick reads (also populate authorId when needed)
    authorName: { type: String, trim: true },
    title: { type: String, trim: true },
    body: { type: String },
    media: { type: [MediaSchema], default: [] },
    tags: { type: [String], default: [] },
    visibility: {
      type: String,
      enum: ["public", "private", "course"],
      default: "public",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
