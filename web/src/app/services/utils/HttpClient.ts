import { storageKeys } from '@/app/config/storageKeys'
import { APIError } from '@/app/errors/APIError'
import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios'

export class HttpClient {
	baseURL: string

	constructor(baseURL: string) {
		this.baseURL = baseURL
	}

	async post<Response = any, Body = any>(
		path: string,
		options?: AxiosRequestConfig<Body> | undefined,
	): Promise<Response> {
		return this.makeRequest(path, {
			method: 'POST',
			data: options?.data,
			headers: options?.headers,
		})
	}

	async get<Response = any>(
		path: string,
		options?: AxiosRequestConfig | undefined,
	): Promise<Response> {
		return this.makeRequest(path, {
			method: 'GET',
			headers: options?.headers,
		})
	}

	async makeRequest<Response = any, Body = any>(
		path: string,
		options: AxiosRequestConfig<Body> | undefined,
	): Promise<Response> {
		const headers = new AxiosHeaders()

		if (options?.data) {
			headers.set('Content-Type', 'application/json')
		}

		if (options?.headers) {
			for (const [header, value] of Object.entries(options.headers)) {
				headers.set(header, value)
			}
		}

		const httpClient = axios.create()

		httpClient.interceptors.request.use((config) => {
			const accessToken = localStorage.getItem(storageKeys.accessToken)

			if (accessToken) {
				config.headers.set('Authorization', `Bearer ${accessToken}`)
			}

			return config
		})

		const response = await httpClient.request<Response>({
			baseURL: `${this.baseURL}${path}`,
			data: options?.data,
			method: options?.method,
			headers: headers,
		})

		const { status, data } = response

		if (status < 200 || status > 399) {
			throw new APIError(response, data)
		}

		return data
	}
}
