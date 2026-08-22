const { Schema, model } = require("mongoose");

// Create a Comment schema
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blog'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
})

// Creating the table comment
const Comment = model('comment', commentSchema)

// Exporting the model
module.exports = Comment;