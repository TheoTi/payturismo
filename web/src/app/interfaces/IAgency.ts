export enum AgencyStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	PENDING = 'pending',
	SUSPENDED = 'suspended',
}

export interface IAgency {
	id: string
	fantasyName: string
	corporateName: string
	cnpj: string
	stateRegistration?: string | null
	municipalRegistration?: string | null
	status: AgencyStatus
	foundationDate?: Date | null
	email: string
	phone: string
	website?: string | null
	createdAt: Date
	updatedAt: Date
}

export interface ICreateAgencyInput {
	fantasyName: string
	corporateName: string
	cnpj: string
	stateRegistration?: string
	municipalRegistration?: string
	status?: AgencyStatus
	foundationDate?: Date
	email: string
	phone: string
	website?: string
}
