import axios from 'axios';

const API = {
    searchTwit: (query) => {
        return axios.post(`/API/analysis/`, query)
    }
};

export default API;