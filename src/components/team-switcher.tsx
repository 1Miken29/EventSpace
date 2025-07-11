import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSalon } from "@/hooks/SalonContext";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import AddRoom from "./add-room";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    id?: number;
    id_user?: number;
    nombre?: string;
    descripcion?: string;
    capacidadMin?: number;
    capacidadMax?: number;
    horarioApertura?: string;
    horarioCierre?: string;
    publicado?: boolean;
    logo?: React.ElementType;
    plan?: string;
    precio?: number;
    bloqueHora?: number;
    precioHoraExtra?: number;
    fileName?: string[];
  }[];
}) {

  const { activeSalon, setActiveSalon } = useSalon();
  const [openSheet, setOpenSheet] = useState(false);

  const { isMobile } = useSidebar();
  // const [activeTeam, setActiveTeam] = useState(teams[0])

  if (!activeSalon) {
    return null;
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeSalon.nombre}
                  </span>
                  <span className="truncate text-xs">{activeSalon.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Salones
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.nombre}
                  onClick={() => setActiveSalon(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <GalleryVerticalEnd className="size-3.5 shrink-0" />
                  </div>
                  {team.nombre}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <SheetTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setOpenSheet(true);
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Añadir Salón
                  </div>
                </DropdownMenuItem>
              </SheetTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SheetContent className="min-w-1/2">
        <AddRoom modalClose={() => {}}/>
      </SheetContent>
    </Sheet>
  );
}
