import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Client {
    private baseURL: string;
    private instance: AxiosInstance;

    constructor() {
        this.baseURL = 'https://reqres.in/api';
        this.instance = axios.create({ baseURL: this.baseURL })
    }

    public get(endpoint: string, config?: AxiosRequestConfig) {
        return this.instance.get(endpoint, config)
    }

    public post(endpoint: string, data: object, config?: AxiosRequestConfig) {
        return this.instance.post(endpoint, data, config)
    }
    
    public put(endpoint: string, data: object, config?: AxiosRequestConfig) {
        return this.instance.put(endpoint, data, config)
    }
}

export const client = new Client();