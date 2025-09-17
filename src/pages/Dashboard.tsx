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
        {/* العنوان الرئيسي */}
        <div>
          <h1 className="text-3xl font-bold text-right">نظرة عامة على لوحة التحكم</h1>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="إجمالي المستخدمين"
            value={totalUsers}
            description="يشمل عدد المستخدمين المسجلين"
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="المشاريع النشطة"
            value={activeProjects}
            description="المشاريع قيد التطوير"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatsCard
            title="إجمالي المعاملات"
            value={`$${totalTransactions.toLocaleString('en-US')}`}
            description="القيمة الإجمالية لجميع المعاملات"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        {/* المخططات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserDistributionChart data={userDistribution} />
          <ProjectStatusChart data={projectStatus} />
        </div>

        {/* الأنشطة الأخيرة */}
        <div className="grid grid-cols-1">
          <RecentActivities activities={recentActivities} />
        </div>
      </div>
    </div>
  )
}