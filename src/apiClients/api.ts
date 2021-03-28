import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { JSObject } from '../types/Common'

const config = {
    path: "http://localhost'5000",
    version: 1
}

const path = {
    signUp: '/sign_up'
}

const instance = axios.create({
    baseURL: config.path
  });
export class ApiClient {
    static signUp(params: JSObject) {
        return instance.post(path.signUp, params)
    }
}