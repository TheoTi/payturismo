import { useIsMobile } from '@/app/hooks/use-mobile'
import { cn } from '@/app/lib/utils'
import { HTMLAttributes, PropsWithChildren } from 'react'
import { useSidebar } from '../components/ui/sidebar'

type TPageHeaderProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export function Header({
	children,
	className,
	...headerAttributes
}: TPageHeaderProps) {
	const { open } = useSidebar()
	const isMobile = useIsMobile()

	return (
		<header
			className={cn(
				'fixed top-2  mb-16 flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4 bg-background rounded-t-2xl z-50',
				open && !isMobile
					? 'w-[calc(100%-17rem)] right-2'
					: 'w-[calc(100%-5rem)]',
				isMobile && 'w-full top-0',
				className,
			)}
			{...headerAttributes}
		>
			{children}
		</header>
	)
}
