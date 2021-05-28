const router = require("express").Router();
const  twitterRoutes = require("./API");

// Post routes
router.use("/", twitterRoutes);

module.exports = router;