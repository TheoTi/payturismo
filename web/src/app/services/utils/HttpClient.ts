import { storageKeys } from '@/app/config/storageKeys'
import { APIError } from '@/app/errors/APIError'
import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios'

export class HttpClient {
	baseURL: string

	constructor(baseURL: string) {
		this.baseURL = baseURL
	}

	async delete<Response = any, Body = any>(
		path: string,
		options?: AxiosRequestConfig<Body> | undefined,
	): Promise<Response> {
		return this.makeRequest(path, {
			method: 'DELETE',
			headers: options?.headers,
		})
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

	async put<Response = any, Body = any>(
		path: string,
		options?: AxiosRequestConfig<Body> | undefined,
	): Promise<Response> {
		return this.makeRequest(path, {
			method: 'PUT',
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

		httpClient.interceptors.response.use(
			(value) => {
				if (value.status < 200 || value.status > 399) {
					throw new APIError(response, value.data)
				}

				return value
			},
			(error) => {
				if (error?.status === 401) {
					window.location.pathname = '/sign-in'
					localStorage.removeItem(storageKeys.accessToken)
					localStorage.removeItem(storageKeys.user)
				}
			},
		)

		const response = await httpClient.request<Response>({
			baseURL: `${this.baseURL}${path}`,
			data: options?.data,
			method: options?.method,
			headers: headers,
		})

		return response?.data
	}
}
