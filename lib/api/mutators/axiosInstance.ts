import axios, { type AxiosRequestConfig } from 'axios';
import qs from 'qs';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

instance.interceptors.request.use((config) => {
  // add auth headers etc. here if needed
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
