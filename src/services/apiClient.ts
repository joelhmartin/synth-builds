import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res: AxiosResponse<T[]>) => res.data);
  };

  getOne = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res: AxiosResponse<T>) => res.data);
  }

  postOne = () => {
    axiosInstance
    .post<T>(`${this.endpoint}`)
  }
}

export default APIClient;