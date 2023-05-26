var express = require("express");
router = express.Router();
const { deleteAssignment } = require("../controllers/teacherController");

router.get("/", (req, res, next) => {
    res.send("Hello, Teacher.")
})

// @desc    delete assignment
// @route   DELETE /deleteassign/:classId/:aId
// @submitted by Minahil Fatima
router.delete("/deleteassign/:classId/:aId", deleteAssignment);

module.exports = router;