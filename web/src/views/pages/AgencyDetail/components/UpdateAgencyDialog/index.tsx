import { AgencyUpdateFormValues } from '@/app/schemas/agency'

import { Button } from '@/views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/views/components/ui/dialog'
import { Edit2 } from 'lucide-react'

import { IAgency } from '@/app/interfaces/IAgency'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UpdateAgencyForm } from './Form'

interface IUpdateAgencyDialogProps {
	initialData: IAgency
	updateAgency: (id: string, data: AgencyUpdateFormValues) => Promise<void>
	isLoading?: boolean
}

export function UpdateAgencyDialog({
	initialData,
	updateAgency,
}: IUpdateAgencyDialogProps) {
	const location = useLocation()
	const navigate = useNavigate()

	const [isOpen, setIsOpen] = useState<boolean>(() => {
		return location.pathname.includes('/edit')
	})

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)

				if (!open) {
					location.pathname.includes('/edit') &&
						navigate(`/agencies/${initialData.id}`)
				}
			}}
		>
			<DialogTrigger>
				<Button
					className='group cursor-pointer bg-accent-foreground'
					onClick={() => {
						setIsOpen(true)
					}}
				>
					<Edit2 className='h-4 w-4' />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] max-h-[95vh] overflow-auto'>
				<DialogHeader>
					<DialogTitle>Update Agency</DialogTitle>
					<DialogDescription>
						Make changes to your agency here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<UpdateAgencyForm
					initialData={initialData}
					onUpdateAgency={updateAgency}
				/>
			</DialogContent>
		</Dialog>
	)
}
