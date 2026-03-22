const express = require('express')
const multer = require('multer')
const path = require('path')

// controller functions
const { signupUser, loginUser, uploadProfilePicture, deleteProfilePicture, followPlan, unfollowPlan } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only images are allowed'))
        }
    }
})

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// upload profile picture route (protected)
router.post('/upload', requireAuth, upload.single('image'), uploadProfilePicture)

// delete profile picture route (protected)
router.delete('/profile', requireAuth, deleteProfilePicture)

module.exports = router
