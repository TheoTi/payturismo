import type { AxiosResponse } from 'axios'

export class APIError extends Error {
	response: AxiosResponse<any, any>
	data: any

	constructor(response: AxiosResponse, data: any) {
		super()

		this.name = 'APIError'
		this.message =
			data?.message || `${response.status} - ${response.statusText}`
		this.response = response
		this.data = data
	}
}
