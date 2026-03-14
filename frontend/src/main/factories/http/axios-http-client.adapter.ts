import { IHttpClient } from "../../../data/protocols/http";
import { AxiosHttpClientAdapter } from "../../../infra/http";

export function makeAxiosHttpClientAdapter<R>(): IHttpClient<R> {
    const axiosHttpClientAdapter = new AxiosHttpClientAdapter<R>();
    return axiosHttpClientAdapter;
}
