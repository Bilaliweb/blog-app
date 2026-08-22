const Blog = require("../models/blog");
const Comment = require("../models/comment");

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

// Fetch Blog Details
async function blogDetails(req, res) {
    // Get id from params
    const blogId = req.params.id

    try {
        /**
         * 
         *  Find Blog with id
         *  'createdBy' is populated here to fetch the details of user as well 
            along with blog details.
         *  createdBy has a reference to user model so mongoose is smart enough
            to populate exact referenced data.
        */
        const blog = await Blog.findById(blogId).populate('createdBy')

        // If blog not found
        if(!blog) return res.status(404).json({ msg: 'Blog not found.' })

        // Fetch comments for that blog
        const blogComments = await Comment.find({ blogId }).populate('createdBy');

        // Render blog detail page with blog details
        return res.render('blogDetail', {
            user: req.user,
            blogDetail: blog,
            comments: blogComments
        })
    } catch (error) {
        console.log('Error while fetching record: ', error);
    }
    
}

// Add comments for blog
async function addComments(req, res) {
    const blog_id = req.params.id
    const user_id = req.user._id

    // Create comment
    const comment = await Comment.create({
        comment: req.body.comment,
        blogId: blog_id,
        createdBy: user_id
    })

    // Redirect to blog detail page on success
    return res.redirect(`/blog/${blog_id}`)
}

module.exports = {
    createNewBlogRoute,
    postNewBlog,
    blogDetails,
    addComments
}