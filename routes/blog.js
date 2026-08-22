const { Router } = require("express");
const { createNewBlogRoute, postNewBlog, blogDetails, addComments } = require("../controllers/blog");
const multer = require('multer');
const path = require('path');

const blogRouter = Router()

// Disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName);
    }
})

// Upload Instance for desired storage
const upload = multer({ storage: storage })

// Get Create a blog
blogRouter.get('/create', createNewBlogRoute)
// Post Create a blog
// upload.single is used for uploading the image and pass on the file object to controller
blogRouter.post('/createBlog', upload.single('coverImage'), postNewBlog)
// Get Blog Details
blogRouter.get('/:id', blogDetails)
// Add Comments
blogRouter.post('/:id/comments', addComments)

module.exports = blogRouter;