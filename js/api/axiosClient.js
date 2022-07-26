import axios from 'axios';

const axiosCline = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosCline;
