import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectStatusCardProps {
  title: string;
  count: number;
  color: string;
}

const ProjectStatusCard = ({ title, count, color }: ProjectStatusCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-gray-900">{count}</div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;