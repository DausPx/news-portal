import axios from 'axios';
const API_KEY = '9a60aff57a4040f190b175c5c0a9d25f';

const API = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers:{
        "X-Api-Key": API_KEY,
    }
});

export default API;