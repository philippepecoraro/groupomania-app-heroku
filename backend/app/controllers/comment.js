const db = require("../models")
const Comment = db.comment;
const User = db.user;

// Créer et enregistrer un nouveau commentaire
exports.createComment = (req, res) => {
    const { text, articleId, userId } = req.body
    if (text && articleId && userId) {
        Comment.create({
            text: text,
            articleId: articleId,
            userId: userId
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            })
    } else {
        res.status(400).json({ error: "Contenu vide" });
    }
};
//Récupérer tous les commentaires de la base de données.
exports.findAllComments = (req, res) => {
    const condition = { articleId: req.params.articleId };
    console.log('condition:', condition)

    Comment.findAll({ where: condition, include: User })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des commentaires"
            });
        });
};

//Signaler un commentaire
exports.updateComment = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "Commentaire mis a jour avec succès."
                });
            } else {
                res.status(400).send({
                    message: `Impossible de mettre à jour le commentaire avec l'ID=${id}. Peut-être que le commentaire n'a pas été trouvé ou que req.body est vide!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur sur la mise à jour des commentaires avec id=" + id
            });
        });
};
//Récupérer les commentaires signalés
exports.getSignalComment = (req, res) => {
    const condition = { signal: req.params.signal };
    console.log('signal:', req.params.signal)

    Comment.findAll({ where: condition, include: User })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur sur la récupération des commentaires"
            });
        });
};

// Supprimer un commentaire avec l'ID spécifié dans la requête
exports.deleteComment = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Commentaire supprimé avec succès!"
                });
            } else {
                res.status(400).send({
                    message: `Impossible de supprimer le  commentaire avec id=${id}. Peut-être que le commentaire n'a pas été trouvé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ne peut pas supprimer le commentaire avec id=" + id
            });
        });
};



