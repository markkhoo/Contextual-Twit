import axios from 'axios';

const API = {
    searchTwit: (query) => {
        return axios.post(`/API/analysis/`, query)
    },
    searchTrending: () => {
        return axios.get('/API/trending')
    }
};

export default API;