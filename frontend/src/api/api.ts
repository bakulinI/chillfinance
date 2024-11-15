import { Category, Entertainment, User } from '@/common/types';
import { AccesTokenResponse, SignInParams, SignUpParams } from '@/types';
import axios from 'axios';

// const apiUrl = 'http://localhost:8000/api/';
const apiUrl = import.meta.env.VITE_API;
export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));
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
    return api.post<AccesTokenResponse>(`${apiUrl}signin/`, data);
  }

  async signUp(data: SignUpParams) {
    return api.post<AccesTokenResponse>(`${apiUrl}signup/`, data);
  }

  async refreshToken() {
    return axios.get<AccesTokenResponse>(`${apiUrl}token/refresh/`, { withCredentials: true });
  }

  async logout() {
    return api.post('logout/');
  }
}

class Api {
  async getMe() {
    return api.get<User>('users/me/');
  }
  async getBanks() {
    return api.get('banks/');
  }
  async getCategories() {
    return api.get<Category[]>('categories/');
  }
  async updateCategories(data: {data: Category['id'][]}) {
    return api.post<Category['id'][]>('users/updateCategories/', data);
  }
  async getEntertainment() {
    return api.get<Entertainment[]>('entertainment/');
  }
}
export const API = new Api();
export const authApi = new AuthApi();
