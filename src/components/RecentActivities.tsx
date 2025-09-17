import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  message: string
  timestamp: string
}

interface RecentActivitiesProps {
  activities: Activity[]
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">أحدث الأنشطة المنجزة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start border-b pb-3 last:border-b-0">
              <span className="text-sm text-muted-foreground">
                {activity.timestamp}
              </span>
              <div className="text-sm text-right flex-1 mr-4">
                {activity.message}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

