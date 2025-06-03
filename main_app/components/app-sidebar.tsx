"use client";
import { ChevronDown, Settings, User, Lock } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { LogoutButton } from "./auth-buttons";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Profile",
    url: "/user/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <Link href={"/home"}>
          <div className="font-bold text-xl p-2">
            Central<span className="text-yellow-300">#resume</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General Section</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathName.endsWith("/user/profile")}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Settings Section
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarMenuButton
                asChild
                isActive={pathName.endsWith("/user/setting")}
              >
                <Link href={"/user/setting"}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                isActive={pathName.endsWith("/user/setting/oauth")}
              >
                <Link href={"/user/setting/oauth"}>
                  <Lock />
                  <span>oauth client</span>
                </Link>
              </SidebarMenuButton>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
