import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
    IHttpClient,
    IRequestParams,
    IRequestResponse,
} from "../../data/protocols/http";

const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create();

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url?.includes("/auth/")
            ) {
                originalRequest._retry = true;

                const refreshToken = localStorage.getItem("refresh_token");

                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/auth/refresh`,
                            { refresh_token: refreshToken }
                        );

                        const { access_token, refresh_token } = response.data;
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);

                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                        return instance(originalRequest);
                    } catch {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        window.location.href = "/login";
                    }
                } else {
                    window.location.href = "/login";
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const axiosInstance = createAxiosInstance();

export class AxiosHttpClientAdapter<R> implements IHttpClient<R> {
    async request(params: IRequestParams): Promise<IRequestResponse<R>> {
        let axiosResponse: AxiosResponse;

        try {
            axiosResponse = await axiosInstance.request({
                headers: params.headers,
                method: params.method,
                data: params.body,
                url: params.url,
            });
        } catch (error) {
            const requestError = error as AxiosError;
            axiosResponse = requestError.response as AxiosResponse;
        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        };
    }
}
