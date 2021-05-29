const router = require("express").Router();
const postController = require("../controllers/postController");



//-----------THIS ROUTE WORKS------------------
router
    .route("/api")
    .get(postController.findAll);

// router
//     .route("/:id")
//     .get(postController.findById);

//----------THIS ROUTE WORKS-------------------
router
    .route("/") 
    .post(postController.create);


router
    .route("/:id")                      //-------------------Left here in case we need it later----------------
    .delete(postController.remove);

router
    .route("/login") 
    .post(postController.findOne);

module.exports = router;


// Matches with "/api/books"
// Matches with "/api/books/:id"