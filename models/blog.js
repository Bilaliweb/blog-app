const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String
    },
    createdBy: {
        // It will refer to 'user' model
        type: Schema.Types.ObjectId, // Syntax for referencing the Id of specific table
        ref: 'user'
    }
}, {
    timestamps: true
})

// Creating a table
const Blog = model('blog', blogSchema)

module.exports = Blog;