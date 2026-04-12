require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//express app
const app = express()


//middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()

})


//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests only if not running in a serverless environment
        if (process.env.NODE_ENV !== 'production') {
            app.listen(process.env.PORT || 4000, () => {
                console.log('connected to db & listening on port', process.env.PORT || 4000)
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

module.exports.handler = serverless(app)




