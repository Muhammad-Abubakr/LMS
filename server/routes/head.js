var express = require("express");
router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello, Head.")
})

module.exports = router;