'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import { cn } from '@/app/lib/utils'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/views/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/views/components/ui/sidebar'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from './ui/badge'

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon: LucideIcon
		isActive?: boolean
		items?: {
			title: string
			url: string
			available: boolean
		}[]
	}[]
}) {
	const location = useLocation()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const itemIsOpen = location.pathname.split('/').includes(item.url)

					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={item.isActive || itemIsOpen}
						>
							<SidebarMenuItem>
								<SidebarMenuButton
									className={cn(
										itemIsOpen && 'bg-secondary/10',
										'hover:bg-secondary/10 transition-all',
									)}
									asChild
									tooltip={item.title}
								>
									<Link to={item.url}>
										<item.icon className='text-primary' />
										<span className={cn(itemIsOpen && 'text-primary')}>
											{item.title}
										</span>
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className='data-[state=open]:rotate-90'>
												<ChevronRight />
												<span className='sr-only'>Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => {
													const isActive = location.pathname.includes(
														subItem.url,
													)

													return (
														<SidebarMenuSubItem
															key={subItem.title}
															className='p-0.5'
														>
															<SidebarMenuSubButton
																asChild
																isActive={isActive}
																className={cn(
																	isActive && 'bg-secondary/10',
																	'hover:bg-secondary/10 transition-all',
																)}
															>
																<Link
																	to={subItem.url}
																	className='flex justify-between'
																>
																	<span>{subItem.title}</span>
																	{!subItem.available && (
																		<Badge variant='destructive'>
																			Available soon
																		</Badge>
																	)}
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													)
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
