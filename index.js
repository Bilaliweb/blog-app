const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { authenticateProvidedToken } = require('./middlewares/authenticateToken')

const app = express()
const port = 8000

// Connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/blogged')
.then(() => {
    console.log('MongoDB connected.');
})

// Express middlewares for views
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// Receiving data for form data
app.use(express.urlencoded({ extended: false }));
// Cookie Parser
app.use(cookieParser());
// Authenticate token before landing to home page
app.use(authenticateProvidedToken('token'))
app.get('/', (req, res) => {
    console.log('Check request for home: ', req);
    
    return res.render('home', {
        user: req.user
    })
})

// Register deisred routes
app.use('/user', userRouter);

// Listening to port
app.listen(port, () => {
    console.log('Server started: ', port);
})