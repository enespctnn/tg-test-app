import axios, { type AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  // Example: auth/header setup goes here
  // config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

export async function axiosInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  const finalConfig = { ...config, ...(options || {}) };
  const { data } = await instance.request<T>(finalConfig);
  return data;
}
