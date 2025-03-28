import { env } from '../config/env'
import { IAgency, ICreateAgencyInput } from '../interfaces/IAgency'
import { AgencyCreateInput, AgencyUpdateFormValues } from '../schemas/agency'
import { HttpClient } from './utils/HttpClient'

class AgencyService {
	private http: HttpClient

	constructor() {
		this.http = new HttpClient(env.baseApiURL)
	}

	async getAgency(id: string) {
		return this.http.get<{ data: IAgency }>(`/agency/${id}/:`)
	}

	async listAgencies() {
		return this.http.get<{ data: IAgency[] }>('/agency/:')
	}

	async updateAgency(id: string, body: AgencyUpdateFormValues) {
		return this.http.put<{ data: IAgency }>(`/agency/${id}/:`, {
			data: body,
		})
	}

	async createAgency(body: AgencyCreateInput) {
		return this.http.post<{ data: IAgency }>('/agency/:', {
			data: body,
		})
	}

	async deleteAgency(id: string) {
		return this.http.delete(`/agency/${id}/:`)
	}
}

export default new AgencyService()
