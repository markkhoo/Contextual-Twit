const router = require("express").Router();
<<<<<<< HEAD
const postController = require("../../controllers/postController");

// Matches with "/api/books"
=======
const postController = require("../controllers/postController");

//=============================================THIS ROUTE WORKS----TWITTER, WATSON, AND VADER API's ROUTES==============================================================
router
    .route("/analysis")
    .post(postController.getTwits)

//=============================================THIS ROUTE WORKS-----FIND ALL USERS---WE NEED TO DEACTIVATE THIS ROUTE----FOR TESTING PURPOSES ONLY======================
>>>>>>> 66c46769d9f6092a7f406c45e1f1746f938f9a57
router
    .route("/")
    .get(postController.findAll);



//=============================================THIS ROUTE WORKS----REGISTER NEW USER===================================================================================
router
    .route("/") 
    .post(postController.create);


//============================================THIS ROUTE WORKS AND VERIFIES EMAIL AND PASSWORD=========================================================================
router
    .route("/login") 
    .post(postController.findOne);

//=================DOES NOT WORK==============THERE'S NO ACTUAL "ROUTE" TO LOGOUT----WE COULD DO A RE-DIRECT TO LOGIN IF WE DESIRE*************************************    
//============================================OR WE COULD DO IT IN THE CLIENT SIDE====================================================================================
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
