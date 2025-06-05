import axios from 'axios';
// import { TOKEN } from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // baseURL: "https://alma-api.edxconnect.com"
});

const handleRequestError = (e) => {
  if (e.response && e.response.data && e.response.data.message)
    return { error: e.response.data.message, status: e.response.status, ...e.response.data };

  if (e.response && e.response.data && e.response.data.errors)
    return { error: e.response.data.errors, status: e.response.status, ...e.response.data };

  if (e.response)
    return { error: 'Something went wrong!', status: e.response.status, ...e.response.data };

  return { error: 'Something went wrong!', status: 503 };
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage?.getItem('Token');
    console.log('axios token-----',token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleRequestError(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(handleRequestError(err));
  }
);

export default axiosInstance;