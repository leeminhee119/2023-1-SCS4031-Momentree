import axios, { AxiosRequestConfig } from 'axios';
const baseURL = 'https://api.datebuzz.net';

interface RequestType {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: object;
  params?: object;
  token?: string;
}

interface ResponseType {
  data?: any;
}

const request = async ({ url, method, body, params, token }: RequestType): Promise<ResponseType> => {
  try {
    const config: AxiosRequestConfig = {
      baseURL,
      params,
      headers: {},
    };
    if (token && config.headers) {
      config.headers['Authorization'] = token;
    }
    const data =
      (method === 'get' && (await axios.get(url, config))) ||
      (method === 'post' && (await axios.post(url, body, config))) ||
      (method === 'patch' && (await axios.patch(url, body, config))) ||
      (method === 'put' && (await axios.put(url, body, config))) ||
      (method === 'delete' &&
        (await axios.delete(url, { baseURL, params, headers: { Authorization: token }, data: body }))) ||
      {};
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GET = (url: string, token?: string) => request({ url, method: 'get', token });
export const POST = (url: string, body?: object, token?: string) => request({ url, method: 'post', body, token });
export const PATCH = (url: string, body?: object, token?: string) => request({ url, method: 'patch', body, token });
export const PUT = (url: string, body?: object, token?: string) => request({ url, method: 'put', body, token });
export const DELETE = (url: string, body?: object, token?: string) => request({ url, method: 'delete', body, token });
