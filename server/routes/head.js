var express = require("express");
router = express.Router();
const HeadController = require("../controllers/headController");


/// Dashboard 
/// Hanzala Javed
router.get("/", HeadController.viewDashboard);

/// Student Results
/// Syed Kumail
router.get('/results/student/:id', HeadController.getStudentResults);

/// Class By ID
router.get("/class/:cid", HeadController.getclassbyid);

/// Course Results
/// Uzair
router.get("/results/course/:cid", HeadController.getCourseResultById);

/// Graph
/// [Abubakr Siddique FA20-BCS-098] 
router.get("/graph", HeadController.getStudentCountForMonth);



module.exports = router;