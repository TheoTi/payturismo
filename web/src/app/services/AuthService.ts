import { env } from '../config/env'
import { RoleKeys } from '../constants/userRole'
import { HttpClient } from './utils/HttpClient'

export interface ISignInDTO {
	email: string
	password: string
}

export interface ISignUpDTO {
	email: string
	password: string
	role: RoleKeys
}

interface ISignInResponse {
	data: {
		token: string
		user: {
			id: string
			email: string
			role: string
		}
	}
}

class AuthService {
	private httpClient: HttpClient

	constructor() {
		this.httpClient = new HttpClient(env.baseApiURL)
	}

	async signIn({ email, password }: ISignInDTO) {
		const { data } = await this.httpClient.post<ISignInResponse>('/login/:', {
			data: {
				email,
				password,
			},
		})

		return {
			token: data.token,
			user: data.user,
		}
	}

	async signUp({ email, password, role }: ISignUpDTO) {
		return this.httpClient.post('/register/:', {
			data: {
				email,
				role,
				password,
			},
		})
	}
}

export default new AuthService()
