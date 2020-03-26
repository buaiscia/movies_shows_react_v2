import axios from 'axios';

// Create fixed root path for axios to TMDB API
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default instance;