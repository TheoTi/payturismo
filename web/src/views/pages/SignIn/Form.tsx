import { Link } from 'react-router-dom'
import { z } from 'zod'

import { routes } from '@/app/Router/routes'
import { useAuth } from '@/app/hooks/useAuth'
import { cn } from '@/app/lib/utils'
import { UserSignInInput, userSignInSchema } from '@/app/schemas/user'
import { Button } from '@/views/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/views/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/views/components/ui/form'
import { Input } from '@/views/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function SignInForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const form = useForm<z.infer<typeof userSignInSchema>>({
		resolver: zodResolver(userSignInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { signIn } = useAuth()

	async function onSubmit(values: UserSignInInput) {
		try {
			await signIn(values)
		} catch (error: any) {
			toast.error('Failed to sign in', {
				description: error?.message,
			})
		}
	}

	function SignInButton() {
		if (form.formState.isSubmitting) {
			return (
				<Button disabled className='gap-1'>
					<Loader2 className='animate-spin h-[1.2rem] w-[1.2rem]' />
					Please wait
				</Button>
			)
		}

		return <Button className='w-full'>Sign in</Button>
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Welcome back</CardTitle>
					<CardDescription>
						Login with your Apple or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-6'>
								<div className='grid gap-6'>
									<div className='grid gap-2'>
										<FormField
											control={form.control}
											name='email'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input placeholder='Your email' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className='grid gap-2'>
										<FormField
											control={form.control}
											name='password'
											render={({ field }) => (
												<FormItem>
													<div className='flex items-center'>
														<FormLabel>Password</FormLabel>
														<a
															href='#'
															className='ml-auto text-sm underline-offset-4 hover:underline'
														>
															Forgot your password?
														</a>
													</div>
													<FormControl>
														<Input type='password' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<SignInButton />
								</div>
								<div className='text-center text-sm'>
									Don&apos;t have an account?{' '}
									<Link
										to={routes.signUp}
										className='underline underline-offset-4'
									>
										Sign up
									</Link>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
				By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
				and <a href='#'>Privacy Policy</a>.
			</div>
		</div>
	)
}
