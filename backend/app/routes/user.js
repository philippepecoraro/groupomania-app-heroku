const express = require('express');
const router = express.Router();
//const { verifySignUp } = require("../middleware");
const controller = require('../controllers/user');
const auth = require('../middleware/authJwt');


//Enregistrer un utilsateur
router.post("/signup", controller.signup);

//Login utilisateur
router.post("/signin", controller.signin);

//Edition prénom et nom
router.put("/signupdate/:id", auth.verify, controller.signupdate);

//Supprimer un compte utilisateur
router.delete("/:id", auth.verify, controller.delete);


module.exports = router;