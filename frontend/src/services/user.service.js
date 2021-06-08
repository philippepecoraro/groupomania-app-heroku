import http from '../http-common';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/articles/';
const API_URL_COMMENT = 'http://localhost:3000/api/comment/';

class UserService {
    getAll() {
        return http.get(API_URL, { headers: authHeader() });
    }

    get(id) {
        return http.get(API_URL + id, { headers: authHeader() });
    }

    create(data) {
        return http.post(API_URL, data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(API_URL + id, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(API_URL + id, { headers: authHeader() });
    }

    deleteAll() {
        return http.delete(API_URL, { headers: authHeader() });
    }

    getAllComment(postId) {
        return http.get(API_URL_COMMENT + "all/" + postId, { headers: authHeader() });
    }
    createComment(data) {
        return http.post(API_URL_COMMENT, data, { headers: authHeader() });
    }

    updateComment(id, data) {
        return http.put(API_URL_COMMENT + id, data, { headers: authHeader() });
    }
    deleteComment(id) {
        return http.delete(API_URL_COMMENT + id, { headers: authHeader() });
    }

    getAllCommentSignal(signal) {
        return http.get(API_URL_COMMENT + "signal/" + signal, { headers: authHeader() });
    }

    getAllArticleSignal(signal) {
        return http.get(API_URL + "signal/" + signal, { headers: authHeader() });
    }

}

export default new UserService();