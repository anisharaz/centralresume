import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function WithSideBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="container mx-auto flex items-center justify-between">
          <SidebarTrigger className="w-fit h-6 box-content p-2" />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default WithSideBarLayout;
