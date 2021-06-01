import axios from 'axios';

const API = {
    searchTwit: (query) => {
        return axios.get(`/api/analysis/${query}`)
    }
};

export default API;