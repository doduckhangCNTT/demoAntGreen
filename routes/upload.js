const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
const { json } = require("express");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Admin can upload image
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image not uploaded" });
    }

    // Kiem tra chat luong anh
    const file = req.files.file;
    if (file.size > 1024 * 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ success: false, message: "File too large" });
    }

    // Kiem image format
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ success: false, message: "File format not supported" });
    }

    // upload
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "antGreen" },
      (err, result) => {
        if (err) {
          throw err;
        }
        removeTmp(file.tempFilePath);

        res.json({
          success: true,
          message: "Uploaded successfully",
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin can delete image
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Not found image need delete" });
    }
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, message: "Deleted image successfully" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
