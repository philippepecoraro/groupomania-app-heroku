const express = require('express');
const articleRoutes = require('./app/routes/article');
const authRoutes = require('./app/routes/user');
const commentRoutes = require('./app/routes/comment');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Synchronisation BDD
const db = require('./app/models');
db.sequelize.sync();

app.use(helmet());
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comment', commentRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    console.log("dirname1:" + (path.join(__dirname, '../frontend/dist/index.html')));
    });   
}
console.log("dirname1:" + (path.join(__dirname, '../frontend/dist/index.html')));
console.log("dirname2:" + (path.join(__dirname, '/frontend/dist/index.html')));
console.log("dirname1:" + (path.join(__dirname, '/dist/index.html')));
module.exports = app;