import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpService {
  private readonly client: AxiosInstance;
  private readonly logger = new Logger(HttpService.name);

  constructor() {
    this.client = axios.create({
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Adding response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        this.logger.error({
          message: 'HTTP request failed',
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          error: error.message,
        });
        return Promise.reject(error);
      },
    );
  }

  async get<T = any>(
    url: string, 
    headers?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'headers'>
  ): Promise<AxiosResponse<T>> {
    return this.client.get(url, { ...config, headers });
  }

  async post<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'headers'>
  ): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, { ...config, headers });
  }

  async put<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'headers'>
  ): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, { ...config, headers });
  }

  async delete<T = any>(
    url: string,
    headers?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'headers'>
  ): Promise<AxiosResponse<T>> {
    return this.client.delete(url, { ...config, headers });
  }
}
