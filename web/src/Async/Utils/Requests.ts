import Axios, { AxiosPromise } from 'axios'
import Path from 'path'

import Config from '../../Async/Constants/Config'

export default class Requests {

    public static get<T>(path: string, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.get(
                Path.join(Config.apiUrl, path),
                this.getOptions(query)
            )
        )
    }

    public static post<T>(path: string, body: Record<string, any> = {}, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.post(
                Path.join(Config.apiUrl, path),
                body,
                this.getOptions(query)
            )
        )
    }

    public static put<T>(path: string, body: Record<string, any> = {}, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.put(
                Path.join(Config.apiUrl, path),
                body,
                this.getOptions(query)
            )
        )
    }

    public static delete<T>(path: string, query: Record<string, any> = {}): Promise<T> {
        return this.process<T>(
            Axios.delete(
                Path.join(Config.apiUrl, path),
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
        return { params: query }
    }

}