import { IAgency } from '@/app/interfaces/IAgency'
import { RoleProtected } from '@/views/components/RoleProtected'
import { Button } from '@/views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionDialogDelete } from './ActionDelete'

interface IDropdownActionsProps {
	agency: IAgency
	isLoading: boolean
	deleteAgency(id: string): Promise<void>
}

export function DropdownActions({
	agency,
	deleteAgency,
}: IDropdownActionsProps) {
	const [isOpenDialog, setIsOpenDialog] = useState({
		deleteDialog: false,
	})

	const navigate = useNavigate()

	return (
		<div>
			<Button
				variant='ghost'
				className='cursor-pointer'
				onClick={() => {
					navigate(agency.id)
				}}
			>
				<Eye />
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => navigator.clipboard.writeText(agency.id)}
					>
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							navigate(`${agency.id}/edit`)
						}}
					>
						Edit
					</DropdownMenuItem>
					<RoleProtected requiredRole='admin'>
						<DropdownMenuItem
							onClick={() => {
								setIsOpenDialog((prevstate) => ({
									...prevstate,
									deleteDialog: true,
								}))
							}}
						>
							Delete
						</DropdownMenuItem>
					</RoleProtected>
				</DropdownMenuContent>
			</DropdownMenu>

			{isOpenDialog.deleteDialog && (
				<ActionDialogDelete
					agency={agency}
					deleteAgency={deleteAgency}
					changeDialogOpen={setIsOpenDialog}
					open={isOpenDialog.deleteDialog}
				/>
			)}
		</div>
	)
}
