const router = require("express").Router();
const postController = require("../../controllers/postController");


// Matches with "/api/books"
router
    .route("/")
    .get(postController.findAll);

// Matches with "/api/books"
router
    .route("/")
    .post(postController.create);

// Matches with "/api/books/:id"
router
    .route("/:id")
    .delete(postController.remove);

// router
//     .route("/google/:book")
//     .get(postsController.googleBooks)

module.exports = router;