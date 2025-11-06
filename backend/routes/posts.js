const express = require("express");
const router = express.Router();
let multer;
let upload;
try {
  multer = require("multer");
  // memory storage so we can access file buffer and store in MongoDB
  const storage = multer.memoryStorage();
  upload = multer({ storage });
} catch (e) {
  console.warn(
    "[posts route] multer is not installed. File upload endpoints will be disabled until you run `npm install multer`"
  );
  multer = null;
  upload = null;
}
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Allowed mime types and size limits
const IMAGE_MIMES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const VIDEO_MIMES = ["video/mp4", "video/webm"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB

// simple sanitizer: remove script tags
function sanitizeText(input) {
  if (!input) return input;
  return input.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
}

// POST /api/posts
// multipart/form-data, files under field name 'files'
if (upload) {
  router.post("/", auth, upload.array("files", 10), async (req, res) => {
    try {
      // resolve the authenticated user so we can store a denormalized authorName
      let authorName;
      try {
        const u = await User.findById(req.user).lean();
        authorName = u ? u.name || u.username : undefined;
      } catch (e) {
        authorName = undefined;
      }
      const { title, body, tags, visibility } = req.body;
      const parsedTags = tags
        ? Array.isArray(tags)
          ? tags
          : tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
        : [];

      // validate visibility
      const vis = ["public", "private", "course"].includes(visibility)
        ? visibility
        : "public";

      const media = [];
      if (req.files && req.files.length) {
        for (const f of req.files) {
          const mime = f.mimetype;
          if (IMAGE_MIMES.includes(mime)) {
            if (f.size > MAX_IMAGE_BYTES)
              return res
                .status(400)
                .json({ message: "Image exceeds 5MB limit" });
            media.push({ data: f.buffer, contentType: mime, kind: "image" });
          } else if (VIDEO_MIMES.includes(mime)) {
            if (f.size > MAX_VIDEO_BYTES)
              return res
                .status(400)
                .json({ message: "Video exceeds 50MB limit" });
            media.push({ data: f.buffer, contentType: mime, kind: "video" });
          } else {
            return res.status(400).json({ message: "Unsupported file type" });
          }
        }
      }

      const post = await Post.create({
        authorId: req.user,
        authorName,
        title: title ? String(title).trim() : undefined,
        body: sanitizeText(body ? String(body) : ""),
        media,
        tags: parsedTags,
        visibility: vis,
      });

      return res.status(201).json({ ok: true, post });
    } catch (err) {
      console.error("Create post error", err);
      return res
        .status(500)
        .json({ ok: false, message: err.message || "Server error" });
    }
  });
} else {
  router.post("/", auth, async (req, res) => {
    return res
      .status(501)
      .json({
        ok: false,
        message:
          "File upload is disabled because the server is missing the multer package. Run `npm install multer` in backend and restart the server.",
      });
  });
}

// GET /api/posts - return recent public posts
router.get("/", async (req, res) => {
  try {
    // populate author name from User if available, and return authorName as a first-class property
    const posts = await Post.find({ visibility: "public" })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("authorId", "name")
      .lean();
    // normalize so front-end can read `authorName` or fall back to populated name
    const normalized = posts.map((p) => ({
      ...p,
      authorName: p.authorName || (p.authorId && p.authorId.name) || "Unknown",
    }));
    return res.json({ ok: true, posts: normalized });
  } catch (err) {
    console.error("Fetch posts error", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// GET /api/posts/me - return posts by authenticated user
router.get("/me", auth, async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user })
      .sort({ createdAt: -1 })
      .populate("authorId", "name")
      .lean();
    const normalized = posts.map((p) => ({
      ...p,
      authorName: p.authorName || (p.authorId && p.authorId.name) || "Unknown",
    }));
    return res.json({ ok: true, posts: normalized });
  } catch (err) {
    console.error("Fetch my posts error", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// GET /api/posts/author/:id - posts by author id
router.get("/author/:id", async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.params.id,
      visibility: "public",
    })
      .sort({ createdAt: -1 })
      .populate("authorId", "name")
      .lean();
    const normalized = posts.map((p) => ({
      ...p,
      authorName: p.authorName || (p.authorId && p.authorId.name) || "Unknown",
    }));
    return res.json({ ok: true, posts: normalized });
  } catch (err) {
    console.error("Fetch author posts error", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
});

module.exports = router;
