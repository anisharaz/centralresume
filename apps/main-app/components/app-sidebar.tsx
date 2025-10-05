"use client";
import {
  ChevronDown,
  Settings,
  User,
  Lock,
  Share2,
  Tag,
  HelpCircle,
} from "lucide-react";

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
import Image from "next/image";

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
        <Link href={"/home"} className="flex items-center gap-1 p-2">
          <div className="relative w-10 h-10 max-md:w-12 max-md:h-12">
            <Image
              src={"https://static.centralresume.me/logo.svg"}
              fill
              alt="Logo"
            />
          </div>
          <div className="font-bold text-xl">Central#resume</div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profile Management</SidebarGroupLabel>
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
              <CollapsibleTrigger className="cursor-pointer">
                Settings Section
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="space-y-2">
              <SidebarMenuButton
                asChild
                isActive={pathName.endsWith("/user/setting/sharing")}
              >
                <Link href={"/user/setting/sharing"}>
                  <Share2 />
                  <span>Sharing</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                isActive={pathName.endsWith("/user/setting/tags")}
              >
                <Link href={"/user/setting/tags"}>
                  <Tag />
                  <span>Tags Management</span>
                </Link>
              </SidebarMenuButton>
              {/* <SidebarMenuButton
                asChild
                isActive={pathName.endsWith("/user/setting/oauth")}
              >
                <Link href={"/user/setting/oauth"}>
                  <Lock />
                  <span>oauth client</span>
                </Link>
              </SidebarMenuButton> */}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup>
          <SidebarGroupLabel>Help & support</SidebarGroupLabel>
          <SidebarMenuButton asChild isActive={pathName.endsWith("/user/help")}>
            <Link href={"/user/help"}>
              <HelpCircle />
              <span>Help</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
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
