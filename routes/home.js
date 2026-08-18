const { Router } = require("express");
const { homeController } = require("../controllers/home");

const homeRouter = Router()

// Get Home Route
homeRouter.get('/', homeController);

module.exports = homeRouter