const express = require('express');
const router = express.Router();
const comment = require("../controllers/comment");
const auth = require("../middleware/authJwt");

//Créer un commentaire
router.post("/", auth.verify, comment.createComment);

//Supprimer un commentaire d'après son id
router.delete("/:id", auth.verifyAdmin, comment.deleteComment);

//Obtenir tous les commentaires dédiés à un article
router.get("/all/:articleId", auth.verify, comment.findAllComments);

//Signaler un commentaire d'après son id
router.put("/:id", auth.verify, comment.updateComment);

//Obtenir les commentaires signalés
router.get("/signal/:signal", auth.verifyAdmin, comment.getSignalComment);


module.exports = router;

