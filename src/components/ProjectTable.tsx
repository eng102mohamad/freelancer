import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  client: string;
  startDate: string;
  status: 'مكتمل' | 'نشط' | 'متوقف';
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
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'نشط': return 'bg-blue-100 text-blue-800';
      case 'متوقف': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="w-full divide-y divide-gray-200">
        <colgroup>
          <col className="w-3/12" /> {/* العنوان */}
          <col className="w-3/12" /> {/* العميل */}
          <col className="w-2/12" /> {/* تاريخ البدء */}
          <col className="w-2/12" /> {/* الحالة */}
          <col className="w-2/12" /> {/* الإجراءات */}
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              العنوان
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              العميل
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              تاريخ البدء
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              الحالة
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              الإجراءات
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
          <p className="text-lg font-medium">لا توجد مشاريع لعرضها</p>
          <p className="text-sm mt-1">انقر على زر "إضافة مشروع جديد" لبدء إدارة مشاريعك</p>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;