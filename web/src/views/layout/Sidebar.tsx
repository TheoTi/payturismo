import { Outlet as Page } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '../components/ui/sidebar'

export function SidebarLayout() {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': '19rem',
				} as React.CSSProperties
			}
			defaultOpen={false}
		>
			<AppSidebar />
			<SidebarInset>
				<main className='py-2 max-w-[100vw]'>
					<Page />
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
