import { NavLink } from "react-router-dom";
import { 
  Home, 
  Users, 
  FolderOpen, 
  DollarSign, 
  Star,  
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/dashboard" },
  { title: "Users Management", icon: Users, path: "/dashboard/users" },
  { title: "Projects Management", icon: FolderOpen, path: "/dashboard/projects" },
  { title: "Financial Services", icon: DollarSign, path: "/dashboard/finance" },
  { title: "Reviews Management", icon: Star, path: "/dashboard/reviews" },
  { title: "Support Tickets", icon: HelpCircle, path: "/dashboard/support-tickets" },
  { title: "General Settings", icon: Settings, path: "/dashboard/settings" },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="border-l border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✦</span>
              </div>
              <span className="font-semibold text-lg text-gray-800">Dashboard</span>
            </div>
          </div>

          <SidebarGroupContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="justify-start px-6 py-3 my-1 transition-all duration-200 hover:bg-red-50 rounded-lg"
                  >
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 w-full ${
                          isActive 
                            ? "text-white bg-red-600" 
                            : "text-gray-700 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="py-4 border-t border-gray-100">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="justify-start px-6 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <a href="#" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Support & Help</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="justify-start px-6 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <a href="#" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}