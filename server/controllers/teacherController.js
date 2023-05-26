const Assignment = require('../models/Assignment');
const Class = require('../models/Class');

//Route for deleting assignment
module.exports.deleteAssignment = (req, res, next) => {
    const { aId } = req.params;
  
    // Remove the assignment from the class
    Class.findByIdAndUpdate({_id:req.params.classId}, { $pull: { assignments: aId } })
      .then(() => {
        // Delete the assignment
        return Assignment.findByIdAndDelete(aId);
      })
      .then(() => {
        res.status(200).json({ message: 'Assignment deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete the assignment' });
      });
};