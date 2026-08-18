const Blog = require("../models/blog");

// Navigate to create blog route
function createNewBlogRoute(req, res) {
    // Render add blog page
    return res.render('addBlog', {
        user: req.user
    })
}

// Create a new blog
async function postNewBlog(req, res) {
    const { coverImage, title, description, createdBy } = req.body

    // Send error to view on false data
    if (!title || !description) return res.render('addBlog', {
        blogError: 'Title or description is missing.'
    })

    try {
        // Create blog and store to db
        const result = await Blog.create({
            coverImageURL: `/uploads/${req.file.filename}`,
            title,
            description,
            createdBy: req.user._id
        })
        // TODO: Redirect to desired page

    } catch (error) {
        console.log('Error while creating a blog: ', error);
    }

    return res.redirect('/')
}

module.exports = {
    createNewBlogRoute,
    postNewBlog
}