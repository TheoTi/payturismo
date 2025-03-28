import { AGENCY_STATUS } from '@/app/constants/agencyStatus'
import { useForm, useFormContext } from 'react-hook-form'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { cn } from '@/app/lib/utils'
import { AgencyCreateInput, agencyCreateSchema } from '@/app/schemas/agency'
import { Button } from '@/views/components/ui/button'
import { Calendar } from '@/views/components/ui/calendar'
import { DialogFooter } from '@/views/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/views/components/ui/form'
import { Input } from '@/views/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/views/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/views/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface IUpdateAgencyFormProps {
	onCreateAgency: (data: AgencyCreateInput) => Promise<void>
}

export function CreateAgencyForm({ onCreateAgency }: IUpdateAgencyFormProps) {
	const form = useForm<AgencyCreateInput>({
		resolver: zodResolver(agencyCreateSchema),
	})

	const navigate = useNavigate()

	async function onSubmit(values: AgencyCreateInput) {
		try {
			await onCreateAgency(values)

			toast.success('Agency successfully created.')
			navigate('/agencies')
		} catch (err: any) {
			toast.error('Failed to create a agency', {
				description: err?.message,
			})
		}
	}

	function SaveChangesButton() {
		if (form.formState.isSubmitting) {
			return (
				<Button disabled className='gap-1'>
					<Loader2 className='animate-spin h-[1.2rem] w-[1.2rem]' />
					Please wait
				</Button>
			)
		}

		return (
			<Button type='submit' className='w-full'>
				Save changes
			</Button>
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='fantasyName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome Fantasia</FormLabel>
							<FormControl>
								<Input placeholder='Digite o nome fantasia' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='municipalRegistration'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Inscrição municipal</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='stateRegistration'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State Register</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='corporateName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Razão Social</FormLabel>
							<FormControl>
								<Input placeholder='Digite a razão social' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='cnpj'
					render={({ field }) => (
						<FormItem>
							<FormLabel>CNPJ</FormLabel>
							<FormControl>
								<Input
									placeholder='00.000.000/0000-00'
									{...field}
									onChange={(e) => {
										const value = e.target.value
											.replace(/\D/g, '')
											.replace(/^(\d{2})(\d)/, '$1.$2')
											.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
											.replace(/\.(\d{3})(\d)/, '.$1/$2')
											.replace(/(\d{4})(\d)/, '$1-$2')
										field.onChange(value)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-full'>
										<SelectValue
											placeholder='Selecione o status'
											className='w-full'
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(AGENCY_STATUS).map((status) => (
										<SelectItem key={status.key} value={status.key}>
											{status.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='foundationDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Data de Fundação</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(new Date(field.value), 'PPP', { locale: ptBR })
											) : (
												<span>Selecione uma data</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value ? new Date(field.value) : undefined}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
										locale={ptBR}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='email@exemplo.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefone</FormLabel>
							<FormControl>
								<Input
									placeholder='(00) 00000-0000'
									{...field}
									onChange={(e) => {
										const value = e.target.value
											.replace(/\D/g, '')
											.replace(/^(\d{2})(\d)/g, '($1) $2')
											.replace(/(\d)(\d{4})$/, '$1-$2')
										field.onChange(value)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='website'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Website</FormLabel>
							<FormControl>
								<Input
									placeholder='https://www.example.com'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<SaveChangesButton />
				</DialogFooter>
			</form>
		</Form>
	)
}
