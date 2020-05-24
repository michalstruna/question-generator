import Axios, { AxiosPromise } from 'axios'
import Path from 'url'
import QueryString from 'query-string'

import Config from '../../Async/Constants/Config'

export default class Requests {

    public static authorization: string | undefined = undefined

    public static get<T>(path: string, query: any = {}): Promise<T> {
        return this.process<T>(
            Axios.get(
                this.getPath(path),
                this.getOptions(query)
            )
        )
    }

    public static post<T>(path: string, body: any = {}, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.post(
                this.getPath(path),
                body,
                this.getOptions(query)
            )
        )
    }

    public static put<T>(path: string, body: any = {}, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.put(
                this.getPath(path),
                body,
                this.getOptions(query)
            )
        )
    }

    public static delete<T>(path: string, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.delete(
                this.getPath(path),
                this.getOptions(query)
            )
        )
    }

    private static process<T>(request: AxiosPromise<T>): Promise<T> {
        return new Promise((resolve, reject) => (
            request
                .then(response => resolve(response.data as T))
                .catch(error => reject(error))
        ))
    }

    private static getOptions(query: Record<string, any>): object {
        const headers: Record<string, string> = {}

        if (Requests.authorization) {
            headers.Authorization = Requests.authorization
        }

        return {
            params: query, paramsSerializer: (query: any) => QueryString.stringify(query, { arrayFormat: 'none' }),
            headers
        }
    }

    private static getPath(path: string): string {
        return (Path.resolve(Config.apiUrl, path).replace('/$', '') + '/')
    }

}