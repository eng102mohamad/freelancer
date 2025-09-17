import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectStatusChartProps {
  data: {
    completed: number
    inProgress: number
    pending: number
    cancelled: number
  }
}

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  const chartData = [
    { name: 'مكتمل', value: data.completed, fill: '#3b82f6' },
    { name: 'مستمر', value: data.inProgress, fill: '#ef4444' },
    { name: 'معلق', value: data.pending, fill: '#f97316' },
    { name: 'ملغي', value: data.cancelled, fill: '#eab308' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">حالة المشروع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

