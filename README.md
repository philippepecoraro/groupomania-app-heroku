Le projet Groupomania est constitué d'une partie Backend et d'une partie Frontend.

La partie backend fonctionne avec Node et express.
l'authentification est basée sur le système de jeton avec Jsonwebtoken.
On utilise Sequelize pour interagir avec la base de donnée MySql.

Pour se connecter coté backend, il faut que l'utilisateur se crée une base de donnée "groupomania" dans MySql. Sur le port par défaut 3306. Il appliquera ses identifiant de connexion de la base de donnée dans le fichier db.config.js. (HOST, USER, PASSWORD).

npm start pour lancer le serveur avec nodemon.

La partie frontend fonctionne avec Vue.js et bootstrap

npm run serve pour lancer le frontend

L'application fonctionne en localhost sur: http://localhost:8081/
