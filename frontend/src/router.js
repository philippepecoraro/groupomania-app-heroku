import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Article from './views/Article.vue';
import Admin from './views/Admin.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: "/articles/:id",
            name: 'articlesid',
            component: Article
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./views/AddArticle.vue")
        },
        {
            path: '/admin',
            component: Admin
        },
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user');

    // tente d'accéder à une page restreinte + non connecté
    // rediriger vers la page de connexion
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});