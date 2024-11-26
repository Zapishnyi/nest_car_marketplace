'use client';
import ICarPaginated from '@/interfaces/ICarPaginated';
import { storage } from '@/services/token.service';
import axios from 'axios';
import { base, urls } from '@/constants/urls';

const axiosInstance = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
});

axiosInstance.interceptors.request.use((request) => {
    const accessToken: string | null = storage.getAccessToken();
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  },
);

interface IApi {
  auth: {
    sing_up: () => void,
    sing_in: () => void,
    refresh: () => void,
    sing_out: () => void,
  },
  car: {
    get: (query: string) => Promise<ICarPaginated>,

  }
}

const api: IApi = {
  auth: {
    sing_up: async () => {
    },
    sing_in: async () => {
    },
    refresh: async () => {
    },
    sing_out: async () => {
    },
  },
  car: {
    get: (query) => axiosInstance.get(`/car?${query}`)
      .then((value) => value.data),
  },
};

export default api;