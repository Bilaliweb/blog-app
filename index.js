const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')

const app = express()
const port = 8000

// Connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/blogged')
.then(() => {
    console.log('MongoDB connected.');
})

// Receiving data for form data
app.use(express.urlencoded({ extended: false }));

// Express middlewares for views
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/', (req, res) => {
    return res.render('home')
})

// Register deisred routes
app.use('/user', userRouter);

// Listening to port
app.listen(port, () => {
    console.log('Server started: ', port);
})