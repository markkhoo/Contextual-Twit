const router = require("express").Router();
const  apiRoutes = require("./API");

// Post routes
router.use("/", apiRoutes);

module.exports = router;