import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    //console.log('request interceptor', config);
    // Do something before request is sent
    //attach token to request if exists
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log(response.data);
    return response.data;
  },
  function (error) {
    if (!error.response) throw new Error('Network error .Please try again later');
    console.log('🚀 ~ file: axiosClient.js ~ line 37 ~ error', error);

    //redirect to login ig not login
    if (error.response.status === 401) {
      window.location.assign('/login.html');
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
