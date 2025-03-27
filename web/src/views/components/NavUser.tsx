"use client";

import { SidebarMenu, SidebarMenuItem } from "@/views/components/ui/sidebar";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserDropdownMenu />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
