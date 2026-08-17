const { Schema, model } = require('mongoose');
const { randomBytes, createHmac } = require('crypto');
const bcrypt = require('bcrypt');

// Create a User Schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // salt: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: './public/images/default.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true
})

// Hasing the password
userSchema.pre('save', function (next) {
    // 'this' will represent this whole user schema
    const user = this;

    // Ignore if password is not modified
    // next() is called to prevent unnecessary hanging
    if (!user.isModified('password')) return next();

    // Random string as secret key
    const salt = randomBytes(16).toString()

    // Create a hash password
    const hashedPassword = createHmac('sha256', salt)
        // Mention the field which we want to update
        .update(user.password)
        // Mention the format we want for result 
        .digest('hex');

    // Updating the object of user
    this.salt = salt;
    // Original password stored as hashed password
    this.password = hashedPassword;

    return next();
})

// Creating a table/model
const User = model('user', userSchema)

// Exporting the model
module.exports = User;