import { Calendar, Info, Plus, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/UserContext";
import { useSalon } from "@/hooks/SalonContext";
import { Sheet, SheetContent } from "./ui/sheet";
import { useState } from "react";
import AddRoom from "./add-room";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const { salones } = useSalon();
  const data = {
    navMainMenu: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
      },
      {
        title: "Información",
        url: "/information",
        icon: Info,
      },
      {
        title: "Reservas",
        url: "/reservations",
        icon: Calendar,
      },
    ],
    navMainServicios: [
      {
        title: "Personal",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Inventario",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Servicios",
        url: "#",
        icon: SquareTerminal,
      },
    ],
  };
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {(salones?.length ?? 0) === 0 ? (
            <>
              <Button
                className="bg-transparent text-black hover:bg-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-start gap-2 mt-1 mb-2 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:m-0 shadow-none"
                onClick={() => setOpenSheet(true)}
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Plus className="size-4" />
                </div>
                <span className="truncate">Agregar Salón</span>
              </Button>
            </>
          ) : (
            <TeamSwitcher
              teams={(salones ?? []).map((salon) => ({
                ...salon,
              }))}
            />
          )}
        </SidebarHeader>
        <SidebarContent>
          <NavMain label="Menu" items={data.navMainMenu} />
          <NavMain label="Servicios" items={data.navMainServicios} />
        </SidebarContent>
        <SidebarFooter>
          {user && <NavUser user={user} />}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SheetContent className="min-w-1/2">
        <AddRoom modalClose={() => {}}/>
      </SheetContent>
    </Sheet>
  );
}
