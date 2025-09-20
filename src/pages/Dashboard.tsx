import { Users, FolderOpen, DollarSign } from "lucide-react"
import { StatsCard } from "@/components/StatsCard"
import { UserDistributionChart } from "@/components/UserDistributionChart"
import { ProjectStatusChart } from "@/components/ProjectStatusChart"
import { RecentActivities } from "@/components/RecentActivities"
import { useAppSelector } from "@/hooks/redux"

export default function Dashboard() {
  const {
    totalUsers,
    activeProjects,
    totalTransactions,
    userDistribution,
    projectStatus,
    recentActivities
  } = useAppSelector((state) => state.dashboard)

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="space-y-6">
        {/* Main Title */}
        <div>
          <h1 className="text-3xl font-bold text-right">Dashboard Overview</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Users"
            value={totalUsers}
            description="Total number of registered users"
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Active Projects"
            value={activeProjects}
            description="Projects currently in development"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatsCard
            title="Total Transactions"
            value={`$${totalTransactions.toLocaleString('en-US')}`}
            description="Total value of all transactions"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectStatusChart data={projectStatus} />
          <UserDistributionChart data={userDistribution} />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1">
          <RecentActivities activities={recentActivities} />
        </div>
      </div>
    </div>
  )
}