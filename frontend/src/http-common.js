import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json"
    }
});
console.log("process:" + process.env.NODE_ENV);
