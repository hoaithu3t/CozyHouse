const fs = require("fs");
const router = require("express").Router();
const { v4 } = require("uuid");

const authMdw = require("../middleware/auth");

const multer = require("multer");

const fileExt = {
  "image/jpeg": ".jpg",
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = `./public/images/${req.user.username}`;
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, v4() + fileExt[file.mimetype]);
  },
});

const upload = multer({ storage: storage });

router.post("/", authMdw(), upload.single("file"), function (req, res, next) {
  res.json(req.file.path);
});

module.exports = router;

// const fs = require("fs");
// const router = require("express").Router();
// const { v4 } = require("uuid");
// var cloudinary = require("cloudinary").v2;
// const authMdw = require("../middleware/auth");

// const multer = require("multer");

// const fileExt = {
//   "image/jpeg": ".jpg",
// };
// cloudinary.uploader.upload("my_picture.jpg", function (error, result) {
//   console.log(result);
// });
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const filePath = `./public/images/${req.user.username}`;
//     fs.mkdirSync(filePath, { recursive: true });
//     cb(null, filePath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, v4() + fileExt[file.mimetype]);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/", authMdw(), upload.single("file"), function (req, res, next) {
//   res.json(req.file.path);
// });

// module.exports = router;
