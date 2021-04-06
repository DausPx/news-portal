import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

const API = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers:{
        "X-Api-Key": API_KEY,
    }
});

export default API;