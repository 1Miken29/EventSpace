import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/information": "Información",
  "/notifications": "Notificaciones",
  "/reservations": "Reservaciones",
  "/profile": "Perfil",
  "/califications": "Calificaciones",
  "/personal": "Personal",
  "/inventario": "Inventario",
  "/servicios": "Servicios",
};

export default function InitialLayout({ children }: any) {
  const navigate = useNavigate()
  const location = useLocation();
  const pathname = location.pathname;

  const title = routeTitles[pathname] || "Inicio";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {routeTitles[pathname] === "Calificaciones" ? (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink className="cursor-pointer" onClick={() => navigate('/information')}>
                        Información
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Calificaciones</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
