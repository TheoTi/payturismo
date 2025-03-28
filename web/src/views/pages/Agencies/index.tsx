import { routes } from '@/app/Router/routes'
import { useAgency } from '@/app/hooks/useAgency'
import { ThemeSwitcher } from '@/views/components/ThemeSwitcher'
import { Separator } from '@/views/components/ui/separator'
import { SidebarTrigger } from '@/views/components/ui/sidebar'
import { Header } from '@/views/layout/Header'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@views/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { AgenciesDataTable } from './components/AgenciesDataTable'
import { columns } from './components/AgenciesDataTable/columns'
import { CreateAgencyDialog } from './components/CreateAgencyDialog'

export function Agencies() {
	const { agencies, isLoading, listAgencies, deleteAgency, createAgency } =
		useAgency()

	useEffect(() => {
		;(async () => {
			try {
				await listAgencies()
			} catch (err: any) {
				toast.error('Failed to list agencies', {
					description: err?.message,
				})
			}
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
								<BreadcrumbLink href={routes.agencies}>
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbPage>Agencies</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className='flex items-center gap-2'>
					<ThemeSwitcher />
				</div>
			</Header>

			<section className=' flex flex-1 flex-col items-center w-full space-y-4 p-4 pt-6 mt-16'>
				<div className='self-end'>
					<CreateAgencyDialog
						createAgency={createAgency}
						isLoading={isLoading}
					/>
				</div>
				<AgenciesDataTable
					columns={columns({
						deleteAgency,
						isLoading,
					})}
					data={agencies}
				/>
			</section>
		</>
	)
}
