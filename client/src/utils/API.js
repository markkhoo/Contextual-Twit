import axios from 'axios';

const API = {
    searchTwit: (query) => {
        return axios.post(`/api/analysis/${query}`)
    }
};

export default API;