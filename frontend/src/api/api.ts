import { AccesTokenResponse, SignInParams, SignUpParams } from '@/types';
import axios from 'axios';

// const apiUrl = 'http://localhost:8000/api/';
const apiUrl = import.meta.env.VITE_API 
export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(`${apiUrl}token/refresh/`, { withCredentials: true });
        localStorage.setItem('token', response.data['access_token']);
        return await api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
  },
);

class AuthApi {
  async signIn(data: SignInParams) {
    return axios.post<AccesTokenResponse>(`${apiUrl}signin/`, data,{
      withCredentials:true
    });
  }

  async signUp(data: SignUpParams) {
    return axios.post<AccesTokenResponse>(`${apiUrl}signup/`, data,{
      withCredentials:true
    });
  }

  async refreshToken() {
    return axios.get<AccesTokenResponse>(`${apiUrl}token/refresh/`, { withCredentials: true });
  }

  async logout() {
    return api.post('logout/');
  }
}
export const authApi = new AuthApi();
