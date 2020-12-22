const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/me", require("./me"));
router.use("/setCard", require("./setCard"));
router.use("/upload", require("./upload"));
router.use("/customer", require("./customer"));
router.use("/room", require("./room"));

module.exports = router;
