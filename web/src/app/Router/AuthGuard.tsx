import { useCallback } from 'react'
import { Navigate, Outlet as Page } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
	const { signedIn } = useAuth()

	const Guard = useCallback(() => {
		if (signedIn && !isPrivate) {
			return <Navigate to='/' replace />
		}

		if (!signedIn && isPrivate) {
			return <Navigate to='/sign-in' replace />
		}

		return <Page />
	}, [signedIn])

	return <Guard />
}
