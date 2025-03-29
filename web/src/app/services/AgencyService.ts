import { env } from "../config/env";
import { IAgency, ICreateAgencyInput } from "../interfaces/IAgency";
import { AgencyCreateInput, AgencyUpdateFormValues } from "../schemas/agency";
import { HttpClient } from "./utils/HttpClient";

export interface IFindOptions {
  [field: string]: string;
}

class AgencyService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient(env.baseApiURL);
  }

  async getAgency(id: string) {
    return this.http.get<{ data: IAgency }>(`/agency/${id}/:`, {});
  }

  async listAgencies(filters?: IFindOptions) {
    const queryString = filters
      ? "?" + new URLSearchParams(filters).toString()
      : "";

    return this.http.get<{ data: IAgency[] }>(`/agency/:${queryString}`);
  }

  async updateAgency(id: string, body: AgencyUpdateFormValues) {
    return this.http.put<{ data: IAgency }>(`/agency/${id}/:`, {
      data: body,
    });
  }

  async createAgency(body: AgencyCreateInput) {
    return this.http.post<{ data: IAgency }>("/agency/:", {
      data: body,
    });
  }

  async deleteAgency(id: string) {
    return this.http.delete(`/agency/${id}/:`);
  }
}

export default new AgencyService();
