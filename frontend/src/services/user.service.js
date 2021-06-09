import http from '../http-common';
import authHeader from './auth-header';

class UserService {
    getAll() {
        return http.get('/articles', { headers: authHeader() });
    }

    get(id) {
        return http.get('/articles/' + id, { headers: authHeader() });
    }

    create(data) {
        return http.post('/articles/', data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put('/articles/' + id, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete('/articles/' + id, { headers: authHeader() });
    }

    deleteAll() {
        return http.delete('/articles/', { headers: authHeader() });
    }

    getAllComment(postId) {
        return http.get('/comment/' + "all/" + postId, { headers: authHeader() });
    }
    createComment(data) {
        return http.post('/comment/', data, { headers: authHeader() });
    }

    updateComment(id, data) {
        return http.put('/comment/' + id, data, { headers: authHeader() });
    }
    deleteComment(id) {
        return http.delete('/comment/' + id, { headers: authHeader() });
    }

    getAllCommentSignal(signal) {
        return http.get('/comment/' + "signal/" + signal, { headers: authHeader() });
    }

    getAllArticleSignal(signal) {
        return http.get('/articles/' + "signal/" + signal, { headers: authHeader() });
    }

}

export default new UserService();