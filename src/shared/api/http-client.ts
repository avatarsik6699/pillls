import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

const API_BASE_URL = process.env.APP_API_BASE_URL;

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();

  const { data } = await AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  });

  return data;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
