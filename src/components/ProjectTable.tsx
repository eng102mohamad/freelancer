import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  client: string;
  startDate: string;
  status: 'Completed' | 'Active' | 'On Hold';
  progress: number;
}

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectTable = ({ projects, onEdit, onDelete }: ProjectTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="w-full divide-y divide-gray-200">
        <colgroup>
          <col className="w-3/12" /> {/* Title */}
          <col className="w-3/12" /> {/* Client */}
          <col className="w-2/12" /> {/* Start Date */}
          <col className="w-2/12" /> {/* Status */}
          <col className="w-2/12" /> {/* Actions */}
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              Client
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-4 text-sm font-medium text-gray-900 truncate text-center" title={project.title}>
                {project.title}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 truncate text-center" title={project.client}>
                {project.client}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 text-center">
                {formatDate(project.startDate)}
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex justify-end gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(project)}
                    className="h-8 w-8 rounded-full hover:bg-blue-100"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(project.id)}
                    className="h-8 w-8 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-b-lg">
          <div className="mb-2">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium">No projects to display</p>
          <p className="text-sm mt-1">Click on the "Add New Project" button to start managing your projects</p>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;