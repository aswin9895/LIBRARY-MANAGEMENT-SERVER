const { json } = require('express');
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// registerUser
exports.registerUserController = async (req, res) => {
    console.log("inside registerUser");
    console.log(req.body);

    const { name, email, phn, password, branch, admnum, admyear, role, profilePic } = req.body
    try {
        const existingUser = await users.findOne({ email }) || await users.findOne({ phn }) || await users.findOne({ admnum })
        if (existingUser) {
            res.status(406).json("Alredy Existing User... Please Login!!!")
        } else {
            const newUser = new users({
                name, email, phn, password, branch, admnum, admyear, role: "student", profilePic: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)

    }

}

// login
exports.loginUserController = async (req, res) => {
    console.log("inside loginUser");
    const { email, password } = req.body
    console.log(req.body);
    try {
        const regUser = await users.findOne({ email })
        if (regUser) {
            const existingUser = await users.findOne({ email, password })
            if (existingUser) {
                // token generation
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(406).json("Inavlid Email/Password")
            }
        } else {
            res.status(406).json("No User Found... Please Register To Continue!!!")
        }

    } catch (error) {
        res.status(401).json(error)
    }
    // res.status(200).json("recevied")
}

// get all users
exports.getAllUsersController = async (req, res) => {
    console.log("inside allUsers");
    try {
        const allUsers = await users.find({ role: "student" })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}

// remove users 
exports.removeUserController = async (req, res) => {
    console.log("inside removeUser");
    const { id } = req.params
    try {
        const deleteUser = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(401).json(error)
    }

}

// profileUpdateController
exports.profileUpdateController = async (req, res) => {
    console.log("inside profileUpdateController");
    const { name, email, phn, branch, admnum, admyear, profilePic } = req.body
    const uploadPic = req.file ? req.file.filename : profilePic
    const { id } = req.params
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: id }, { name, email, phn, branch, admnum, admyear, profilePic: uploadPic }, { new: true })
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error)
    }
}