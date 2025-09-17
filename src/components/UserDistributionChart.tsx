import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserDistributionChartProps {
  data: {
    customers: number
    managers: number
    admins: number
  }
}

const COLORS = ['#3b82f6', '#ef4444', '#f97316']

export function UserDistributionChart({ data }: UserDistributionChartProps) {
  const chartData = [
    { name: 'العملاء', value: data.customers, color: COLORS[0] },
    { name: 'المديرون', value: data.managers, color: COLORS[1] },
    { name: 'المديرين', value: data.admins, color: COLORS[2] }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">توزيع المستخدمين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

