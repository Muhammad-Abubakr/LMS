/* Controllers for Graph */


// For any month
// Controller for retrieving the count of students added for a specific month and year
async function getStudentCountForMonth(req, res) {
    try {
        const { month, year } = req.body;

        // Validate month and year inputs
        if (!month || !year) {
            return res.status(400).json({ error: "Month and year are required" });
        }

        // Set the start and end dates based on the requested month and year
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Count the students enrolled between the start and end dates
        const studentCount = await Student.countDocuments({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        res.json({ count: studentCount });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the count of students for the requested month" });
    }
}


module.exports = {
    getStudentCountForMonth
}