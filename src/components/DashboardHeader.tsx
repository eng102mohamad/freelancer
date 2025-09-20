import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { 
  SidebarTrigger
} from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium">Ahmed Mohamed</span>
          <span className="text-xs text-gray-500">System Administrator</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-700 font-medium">A</span>
        </div>
      </div>
    </header>
  )
}