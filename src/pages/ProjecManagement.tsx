import React, { useState } from 'react';
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectTable from "@/components/ProjectTable";
import AddProjectModal from "@/components/AddProjectModal";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { addProject, deleteProject, updateProject } from "@/store/dashboardSlice";

export default function ProjectManagement() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.dashboard.projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.includes(searchQuery) ||
      project.client.includes(searchQuery)
  );

  const handleAddProject = (projectData: any) => {
    if (editingProject) {
      dispatch(updateProject({ ...projectData, id: editingProject.id }));
      setEditingProject(null);
    } else {
      dispatch(addProject({ ...projectData, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المشروع؟')) {
      dispatch(deleteProject(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="space-y-6">
        {/* العنوان الرئيسي */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-right">إدارة المشاريع</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مشروع جديد
          </Button>
        </div>

        {/* شريط البحث */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="ابحث عن مشروع أو عميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-right"
          />
        </div>

        {/* جدول المشاريع */}
        <ProjectTable
          projects={filteredProjects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />

        {/* نافذة إضافة/تعديل المشروع */}
        <AddProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleAddProject}
          project={editingProject}
        />
      </div>
    </div>
  );
}