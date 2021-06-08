const express = require('express');
const router = express.Router();
const articles = require("../controllers/article");
const auth = require("../middleware/authJwt");


//Créer un article
router.post("/", auth.verify, articles.create);

//Obtenir tous les article
router.get("/", auth.verify, articles.findAll);

//Obtenir un article d'après son id
router.get("/:id", auth.verify, articles.findOne);

//Signaler un article
router.put("/:id", auth.verify, articles.update);

//Supprimer un article d'après son id
router.delete("/:id", auth.verify, articles.delete);

//Supprimer tous les articles
router.delete("/", auth.verifyAdmin, articles.deleteAll);

//Obtenir les articles signalés
router.get("/signal/:signal", auth.verifyAdmin, articles.getSignalArticle);

module.exports = router;