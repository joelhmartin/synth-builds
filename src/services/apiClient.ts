import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://3.147.63.116:3000/',
  withCredentials: true,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T[]>(this.endpoint, { ...config, withCredentials: true })
      .then((res: AxiosResponse<T[]>) => res.data)
      .catch((error) => {
        // Handle the error (log it, show a message, etc.)
        throw error;
      });
  };

  getOne = (id: number | string, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`, { ...config, withCredentials: true })
      .then((res: AxiosResponse<T>) => res.data)
      .catch((error) => {
        // Handle the error
        throw error;
      });
  };

  postOne = (data: any, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .post<T>(this.endpoint, data, { ...config, withCredentials: true })
      .then((res: AxiosResponse<T>) => res.data)
      .catch((error) => {
        // Handle the error
        throw error;
      });
  };
}

export default APIClient;
