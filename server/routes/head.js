var express = require("express");
router = express.Router();
const HeadController = require("../controllers/headController");

router.get("/", (req, res, next) => {
    res.send("Hello, Head.")
})

/* Graph Routes */
router.get("/graph", HeadController.getStudentCountForMonth);



module.exports = router;