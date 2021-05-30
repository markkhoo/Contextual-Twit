const router = require("express").Router();
const postController = require("../controllers/postController");



//-----------THIS ROUTE WORKS------------------
router
    .route("/")
    .get(postController.findAll);

// router
//     .route("/:id")
//     .get(postController.findById);

//----------THIS ROUTE WORKS-------------------
router
    .route("/") 
    .post(postController.create);


// router
//     .route("/:id")                      //-------------------Left here in case we need it later----------------
//     .delete(postController.remove);


//-----THIS ROUTE WORKS BUT SEE COMMENTS ON postController-----------------------    
router
    .route("/login") 
    .post(postController.findOne);

router.post('/logout', (req,res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

module.exports = router;


// Matches with "/api/books"
// Matches with "/api/books/:id"