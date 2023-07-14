import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers : {
        common : {
            'Authorization' : localStorage.getItem('token')
        }
    }
});

export default api;