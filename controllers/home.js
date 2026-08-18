const Blog = require("../models/blog")

async function homeController (req, res) {
    // Get all blogs in desc order
    const allBlogs = await Blog.find({});
    
    // Pass all blogs to home view for rendering
    return res.render('home', {
        // 'req.user' coming/passed from main auth jwt middleware
        user: req.user,
        blogs: allBlogs
    })
}

module.exports = {
    homeController
}