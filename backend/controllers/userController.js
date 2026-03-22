const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            fitnessGoal: user.fitnessGoal,
            email,
            profilePicture: user.profilePicture || '',
            token
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { firstName, lastName, age, fitnessGoal, email, password } = req.body

    try {
        const user = await User.signup(firstName, lastName, age, fitnessGoal, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ firstName, lastName, age, fitnessGoal, email, profilePicture: user.profilePicture || '', token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// upload profile picture
const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            throw Error('Please upload an image')
        }

        // Optional: Delete old picture if it exists
        const currentUser = await User.findById(req.user._id)
        if (currentUser.profilePicture) {
            const oldPath = path.join(__dirname, '..', 'uploads', currentUser.profilePicture)
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profilePicture: req.file.filename },
            { new: true }
        )

        res.status(200).json({ profilePicture: user.profilePicture })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete profile picture
const deleteProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        
        if (user.profilePicture) {
            const filePath = path.join(__dirname, '..', 'uploads', user.profilePicture)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }

        user.profilePicture = ''
        await user.save()

        res.status(200).json({ profilePicture: '' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser, uploadProfilePicture, deleteProfilePicture }
