import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useMemo,
	useState,
} from 'react'
import { storageKeys } from '../config/storageKeys'
import AuthService, {
	ISignUpDTO,
	type ISignInDTO,
} from '../services/AuthService'

export type TUserRole = 'admin' | 'analyst'

export interface IAuthUser {
	id: string
	email: string
	role: TUserRole
}

interface IAuthContextValue {
	user: null | IAuthUser
	signedIn: boolean
	signIn(signInDTO: ISignInDTO): Promise<void>
	signUp(signUpDTO: ISignUpDTO): Promise<void>
	signOut(): void
	hasPermission: (requiredRole: IAuthUser['role']) => boolean
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthProvider({ children }: PropsWithChildren) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		return !!localStorage.getItem(storageKeys.accessToken)
	})
	const [user, setUser] = useState<null | IAuthUser>(() => {
		const storagedUser = localStorage.getItem(storageKeys.user)

		return storagedUser && JSON.parse(storagedUser ? storagedUser : '{}')
	})

	const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
		const authentication = await AuthService.signIn({
			email,
			password,
		})

		localStorage.setItem(storageKeys.accessToken, authentication.token)
		localStorage.setItem(storageKeys.user, JSON.stringify(authentication.user))

		setUser(authentication.user as IAuthUser)
		setSignedIn(true)
	}, [])

	const hasPermission = useCallback(
		(requiredRole: IAuthUser['role']) => {
			if (!user) return false
			return user.role === requiredRole
		},
		[user],
	)

	const signUp = useCallback(async ({ email, password, role }: ISignUpDTO) => {
		await AuthService.signUp({
			email,
			password,
			role,
		})
	}, [])

	const signOut = useCallback(() => {
		localStorage.clear()
		setSignedIn(false)
		setUser(null)
	}, [])

	const value: IAuthContextValue = useMemo(
		() => ({
			user,
			signedIn,
			signIn,
			signOut,
			hasPermission,
			signUp,
		}),
		[user, signedIn, signIn, signOut, signUp, hasPermission],
	)

	console.log(value)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
