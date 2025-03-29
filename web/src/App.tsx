import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Router } from './app/Router'
import { storageKeys } from './app/config/storageKeys'
import { AuthProvider } from './app/contexts/AuthContext'
import { ThemeProvider } from './app/contexts/ThemeContext'

function App() {
	return (
		<AuthProvider>
			<ThemeProvider defaultTheme='dark' storageKey={storageKeys.theme}>
				<BrowserRouter
					future={{
						v7_startTransition: false,
						v7_relativeSplatPath: false,
					}}
				>
					<Router />
					<Toaster />
				</BrowserRouter>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
