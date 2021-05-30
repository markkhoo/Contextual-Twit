const router = require("express").Router();
const postController = require("../controllers/postController");

router
    .route("/analysis")
    .post(postController.getTwits)

//-----------THIS ROUTE WORKS------------------
router
    .route("/")
    .get(postController.findAll);



//----------THIS ROUTE WORKS-------------------
router
    .route("/") 
    .post(postController.create);


//-----THIS ROUTE WORKS BUT SEE COMMENTS ON postController-----------------------    
router
    .route("/login") 
    .post(postController.findOne);

router
    .route('/logout')
    .post(postController.destroy); 
   

module.exports = router;




// router
//     .route("/:id")
//     .get(postController.findById);


// router
//     .route("/:id")                      //-------------------Left here in case we need it later----------------
//     .delete(postController.remove);
