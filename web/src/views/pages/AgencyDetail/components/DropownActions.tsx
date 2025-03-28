import { AgencyStatus } from '@/app/interfaces/IAgency'
import { Button } from '@/views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { ChangeStatusDialog } from './ChangeStatusDialog'

interface IDropdownActionsProps {
	isLoading: boolean
	changeAgencyStatus: (id: string, status: AgencyStatus) => Promise<void>
}

export function DropdownActions({
	changeAgencyStatus,
	isLoading,
}: IDropdownActionsProps) {
	const [isOpenDialog, setIsOpenDialog] = useState({
		changeStatusDialog: false,
	})

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						size='icon'
						className='dark:bg-transparent rounded-full cursor-pointer dark:hover:bg-accent/10'
					>
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							setIsOpenDialog((prevState) => ({
								...prevState,
								changeStatusDialog: true,
							}))
						}}
					>
						Change status
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{isOpenDialog.changeStatusDialog && (
				<ChangeStatusDialog
					open={isOpenDialog.changeStatusDialog}
					changeDialogOpen={setIsOpenDialog}
					isLoading={isLoading}
					changeAgencyStatus={changeAgencyStatus}
				/>
			)}
		</>
	)
}
