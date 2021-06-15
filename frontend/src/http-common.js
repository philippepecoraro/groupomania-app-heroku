//require('dotenv').config();
import axios from "axios";

export default axios.create({
    baseURL: process.env.VUE_APP_ENV_URL,
    headers: {
        "Content-type": "application/json"
    }
});

console.log("NODE_ENV:" + process.env.NODE_ENV);
console.log("VUE_APP_ENV_URL:" + process.env.VUE_APP_ENV_URL);

