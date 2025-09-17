// src/components/DashboardSidebar.tsx
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Users, 
  FolderOpen, 
  DollarSign, 
  Star, 
  BarChart3, 
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
  { title: "لوحة التحكم", icon: Home, path: "/dashboard" },
  { title: "إدارة المستخدمين", icon: Users, path: "/dashboard/users" },
  { title: "إدارة المشاريع", icon: FolderOpen, path: "/dashboard/projects" },
  { title: "الخدمات المالية", icon: DollarSign, path: "/dashboard/finance" },
  { title: "إدارة المراجعات", icon: Star, path: "/dashboard/reviews" },
  { title: "تقارير الأداء", icon: BarChart3, path: "/dashboard/reports" },
  { title: "الإعدادات العامة", icon: Settings, path: "/dashboard/settings" },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="border-l border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          {/* الشعار */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 justify-end">
              <span className="font-semibold text-lg text-gray-800">لوحة التحكم</span>
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✦</span>
              </div>
            </div>
          </div>

          <SidebarGroupContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="justify-end px-6 py-3 my-1 transition-all duration-200 hover:bg-blue-50 rounded-lg"
                  >
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 w-full ${
                          isActive 
                            ? "text-blue-700 bg-blue-100" 
                            : "text-gray-700 hover:text-gray-900"
                        }`
                      }
                    >
                      <span className="text-right flex-1 font-medium">
                        {item.title}
                      </span>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
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
                  className="justify-end px-6 py-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  <a href="#" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>الدعم والمساعدة</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="justify-end px-6 py-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  <a href="#" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
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