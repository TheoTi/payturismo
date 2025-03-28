import { ThemeSwitcher } from '@/views/components/ThemeSwitcher'
import { Badge } from '@/views/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/views/components/ui/breadcrumb'
import { Button } from '@/views/components/ui/button'
import { Separator } from '@/views/components/ui/separator'
import { SidebarTrigger } from '@/views/components/ui/sidebar'

import { routes } from '@/app/Router/routes'
import { AGENCY_STATUS } from '@/app/constants/agencyStatus'
import { useAgency } from '@/app/hooks/useAgency'
import { IAgency } from '@/app/interfaces/IAgency'
import { Header } from '@/views/layout/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
	ArrowLeft,
	Building2,
	Calendar,
	Edit2,
	FileText,
	Globe,
	Mail,
	Phone,
	Slash,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { DropdownActions } from './components/DropownActions'
import { UpdateAgencyDialog } from './components/UpdateAgencyDialog'

export function AgencyDetail() {
	const { agencyId } = useParams()
	const {
		agencies: [agency = {} as IAgency],
		isLoading,
		getAgency,
		changeAgencyStatus,
		updateAgency,
	} = useAgency()

	useEffect(() => {
		if (!agencyId) {
			toast.error('Failed to get agencies', {
				description: 'Missing param: agencyId',
			})

			return
		}
		;(async () => {
			await getAgency(agencyId)
		})()
	}, [])

	return (
		<>
			<Header>
				<div className='flex items-center gap-2'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href={routes.agencies}>Agencies</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbPage>{agency.fantasyName}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className='flex items-center gap-2'>
					<ThemeSwitcher />
				</div>
			</Header>

			{isLoading ? (
				<h1>carregando...</h1>
			) : (
				<section className='flex flex-1 flex-col w-full space-y-8 p-6 md:p-8 mt-16 max-w-6xl mx-auto'>
					<div className='flex justify-between items-center mb-6'>
						<Link to={routes.agencies}>
							<Button
								variant='ghost'
								className='flex items-center gap-2 cursor-pointer'
							>
								<ArrowLeft className='h-4 w-4' />
								Back to agencies
							</Button>
						</Link>

						<Badge
							variant={AGENCY_STATUS[agency.status]?.variant}
							className='px-4 py-1.5 text-sm'
						>
							{AGENCY_STATUS[agency.status]?.label}
						</Badge>
					</div>

					<div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
						<div className='bg-gradient-to-r from-primary/10 to-secondary/10 p-6 md:p-8 border-b border-gray-100'>
							<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
								<div>
									<h1 className='text-2xl md:text-3xl font-bold text-primary dark:text-secondary'>
										{agency?.fantasyName}
									</h1>
									<p className='text-primary/80 dark:text-secondary/80 mt-1'>
										{agency.corporateName}
									</p>
								</div>

								<div className='flex flex-col md:flex-row items-center gap-3'>
									{agency.email && (
										<Button className='bg-foreground'>
											<a
												href={`mailto:${agency.email}`}
												className='flex items-center gap-2'
											>
												<Mail className='h-4 w-4' />
												Contact
											</a>
										</Button>
									)}
									{agency.website && (
										<Button className='bg-accent-foreground'>
											<a
												href={agency.website}
												target='_blank'
												rel='noreferrer noopener'
												className='flex items-center gap-2'
											>
												<Globe className='h-4 w-4' />
												Visit Website
											</a>
										</Button>
									)}

									<DropdownActions
										changeAgencyStatus={changeAgencyStatus}
										isLoading={isLoading}
									/>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8'>
							<div className='space-y-4'>
								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<FileText className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											CNPJ
										</h3>
										<p className='text-gray-800'>{agency.cnpj}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Building2 className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Inscrição Estadual
										</h3>
										<p className='text-gray-800'>{agency.stateRegistration}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Building2 className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Inscrição Municipal
										</h3>
										<p className='text-gray-800'>
											{agency.municipalRegistration}
										</p>
									</div>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Calendar className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Data de Fundação
										</h3>
										<p className='text-gray-800'>
											{agency?.foundationDate &&
												format(
													new Date(agency.foundationDate),
													'dd MMMM yyyy',
													{
														locale: ptBR,
													},
												)}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Mail className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Email
										</h3>
										<p className='text-gray-800 break-all'>{agency.email}</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Phone className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Telefone
										</h3>
										<p className='text-gray-800'>{agency.phone}</p>
									</div>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Calendar className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Cadastrado em
										</h3>
										<p className='text-gray-800'>
											{agency.createdAt &&
												format(new Date(agency.createdAt), 'dd/MM/yyyy HH:mm')}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<Calendar className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											Última atualização
										</h3>
										<p className='text-gray-800'>
											{agency.updatedAt &&
												format(new Date(agency.updatedAt), 'dd/MM/yyyy HH:mm')}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='p-2 bg-primary/10 dark:bg-secondary/10 rounded-lg text-gray-600'>
										<FileText className='h-5 w-5' />
									</div>
									<div>
										<h3 className='font-bold text-primary dark:text-secondary'>
											ID
										</h3>
										<p className='text-gray-800 text-sm font-mono break-all'>
											{agency.id}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3'>
							<UpdateAgencyDialog
								initialData={agency}
								updateAgency={updateAgency}
								isLoading={isLoading}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	)
}
