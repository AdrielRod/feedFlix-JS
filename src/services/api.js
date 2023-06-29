// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=793d61f09cc067ffddceab5912d2bed6
// BASE DA URL: https://api.themoviedb.org/3

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api