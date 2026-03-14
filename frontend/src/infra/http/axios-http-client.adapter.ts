import axios, { AxiosError, AxiosResponse } from "axios";
import {
    IHttpClient,
    IRequestParams,
    IRequestResponse,
} from "../../data/protocols/http";

export class AxiosHttpClientAdapter<R> implements IHttpClient<R> {
    async request(params: IRequestParams): Promise<IRequestResponse<R>> {
        let axiosResponse: AxiosResponse;

        try {
            axiosResponse = await axios.request({
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
