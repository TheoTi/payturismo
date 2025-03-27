import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/views/components/ui/sidebar";
import { NavMain } from "@views/components/NavMain";
import { NavSecondary } from "@views/components/NavSecondary";
import { NavUser } from "@views/components/NavUser";
import {
  Bot,
  ConciergeBell,
  LifeBuoy,
  Send,
  SquareTerminal,
} from "lucide-react";
import type { ComponentProps } from "react";

import logo from "@views/assets/logo.png";

import { cn } from "@/app/lib/utils";
import { useIsMobile } from "@/app/hooks/use-mobile";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Agências",
      url: "agencies",
      icon: ConciergeBell,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className={cn(props?.className)}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <img
              src={logo}
              alt="payturismo Logo"
              className={cn(open && isMobile ? "w-32" : "w-48")}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
