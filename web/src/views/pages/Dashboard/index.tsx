import { routes } from '@/app/Router/routes'
import { useAgency } from '@/app/hooks/useAgency'
import { ThemeSwitcher } from '@/views/components/ThemeSwitcher'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from '@/views/components/ui/breadcrumb'
import { Separator } from '@/views/components/ui/separator'
import { SidebarTrigger } from '@/views/components/ui/sidebar'
import { Header } from '@/views/layout/Header'
import { ExternalLink, Link2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { AgenciesSection } from './AgenciesSection'

export function Dashboard() {
	const { agencies, isLoading, listAgencies } = useAgency()

	useEffect(() => {
		;(async () => {
			try {
				await listAgencies()
			} catch (err: any) {
				toast.error('Failed to get agencies', {
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
								<BreadcrumbPage>Dashboard</BreadcrumbPage>
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
				<>
					<AgenciesSection agencies={agencies} />

					<Link
						to={routes.agencies}
						className='flex items-center justify-center gap-1.5 my-2 text-sm transition-all hover:opacity-80 hover:underline group'
					>
						View all agencies
						<ExternalLink className='w-[1.2rem] h-[1.2rem] group:hover:opacity-80' />
					</Link>
				</>
			)}
		</>
	)
}
