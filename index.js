const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { authenticateProvidedToken } = require('./middlewares/authenticateToken')
const blogRouter = require('./routes/blog')
const homeRouter = require('./routes/home')

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
// By default express doesn't entertain static routes like if we are trying to access in our directory structure
// In order to acheive, allow express to access specific static route
app.use(express.static(path.resolve('./public')))

// Register deisred routes
// Home Route
app.use('/', homeRouter);
// User Routes
app.use('/user', userRouter);
// Blog Routes
app.use('/blog', blogRouter);

// Listening to port
app.listen(port, () => {
    console.log('Server started: ', port);
})