const router = require("express").Router();
const  apiRoutes = require("./API");

// Post routes
router.use("/api", apiRoutes);

module.exports = router;