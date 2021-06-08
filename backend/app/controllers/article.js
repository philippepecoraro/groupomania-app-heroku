const db = require("../models");
const Article = db.article;
const User = db.user;


// Créer et enregistrer un nouvel article
exports.create = (req, res) => {
    if (req.body.title && req.body.description && req.body.text && req.body.userId) {
        // Créer un article
        const article = {
            title: req.body.title,
            description: req.body.description,
            text: req.body.text,
            userId: req.body.userId
        };
        Article.create(article)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la création de l'article."
                });
            });
    } else {
        res.status(400).json({ error: "Contenu vide" });
    }
};

//Récupérer tous les articles de la base de données.
exports.findAll = (req, res) => {
    Article.findAll({ order: [['createdAt', 'DESC']], include: User })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des articles."
            });
        });
};

// Trouver un seul article avec un id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findOne({ where: { id: id }, include: User })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de l'article avec l'ID=" + id
            });
        });
};

//Signaler un article
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send({
                    message: "L'article a été mis à jour avec succès."
                });
            } else {
                res.status(400).send({
                    message: `Impossible de mettre à jour l'article avec  l'id=${id}.Peut-être que l'article n'a pas été trouvé ou que req.body est vide! !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour de l'article avec l'ID=" + id
            });
        });

};

// Supprimer un article avec l'ID spécifié dans la requête
exports.delete = (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    Article.findOne({ where: { id: id }, include: User })
        .then(data => {
            if (decodedToken.id == data.user.id || decodedToken.isAdmin) {

                Article.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.status(200).send({
                                message: "L'article a été supprimé avec succès!"
                            });
                        } else {
                            res.status(400).send({
                                message: `Impossible de supprimer l'article avec l'identifiant=${id}.Peut-être que l'article n'a pas été trouvé !`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Impossible de supprimer l'article avec l'identifiant=" + id
                        });
                    });
            } else {
                res.status(403).send({
                    message: "Message"
                })
            }
        })
};

//Supprimer tous les articles de la base de données .
exports.deleteAll = (req, res) => {
    Article.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({ message: `${nums} L'article a été supprimé avec succès!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la suppression de tous les articles."
            });
        });
};

//Récupérer les articles signalés
exports.getSignalArticle = (req, res) => {
    const condition = { signal: req.params.signal };

    Article.findAll({ where: condition, include: User })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur sur la récupération des articles"
            });
        });
}