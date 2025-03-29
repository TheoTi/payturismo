import { ThemeSwitcher } from '@/views/components/ThemeSwitcher'
import logo from '@views/assets/logo.png'
import { SignInForm } from './Form'

export function SignIn() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-primary p-6 md:p-10'>
			<div className='absolute top-5 right-5'>
				<ThemeSwitcher />
			</div>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<img src={logo} alt='payturismo' className='w-48 self-center' />
				<SignInForm />
			</div>
		</div>
	)
}
