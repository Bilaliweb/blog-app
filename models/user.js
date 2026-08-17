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

// Hashing the password
userSchema.pre('save', async function () {
    // No Need to use next() for current logic

    // Referencing to this current user schema
    const user = this;

    // Ignore if password didn't get modified
    if (!user.isModified('password')) return;

    try {
        // Use bcrypt as it's more secure (slow hashing)
        // A cost factor of 10-12 is recommended for modern servers
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt);
        
    } catch (error) {
        // Pass errors to Mongoose's error handling
        throw error
    }
});

// Function to compare user provided password with stored hashed password
userSchema.methods.compareLoginPassword = async function (passwordFromRequestBody) {
    return await bcrypt.compare(passwordFromRequestBody, this.password)
}

// Creating a table/model
const User = model('user', userSchema)

// Exporting the model
module.exports = User;