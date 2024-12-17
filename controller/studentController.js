const students = require('../models/studentModel')

// getallStudentController
exports.getStudentController = async (req, res) => {
    console.log("getAllStudentController");
    const { field, value } = req.query
    const query = { [field]: value }
    console.log(query);

    if (query) {
        const existingStudent = await students.findOne(query)
        if (existingStudent) {
            try {
                res.status(200).json(existingStudent)
            } catch (error) {
                res.status(401).json(error)
            }  
        }else{
            res.status(406).json("No student found")
        }
        
    }
}