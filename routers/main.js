const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { initDB } = require("../models/db_base");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/init", verifyToken, (req, res) => {
  if (req.user.permissions === 1) {
    initDB();
    res.json({ msg: "DB initialized" });
  } else {
    res.status(403).send("Unauthorized: no user info");
  }
});

module.exports = router;
