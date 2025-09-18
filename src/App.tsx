import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import Home from "@/pages/Home"
import Dashboard from "@/pages/Dashboard"
import ProjectManagement from "./pages/ProjecManagement"
import UserManagement from "./pages/UserManagement"
import FinanceManagement from "./pages/FinanceManagement"
import ReviewsManagement from "./pages/ReviewsManagement"
import './App.css'
import SupportTickets from "./pages/SupportTickets"
import GeneralSettings from "./pages/GeneralSettings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

// مكون التخطيط الخاص باللوحة مع الشريط الجانبي
function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="finance" element={<FinanceManagement />} />
            <Route path="reviews" element={<ReviewsManagement />} />
            <Route path="support-tickets" element={<SupportTickets />} />
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default App