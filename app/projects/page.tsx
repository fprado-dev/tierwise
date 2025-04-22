'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProjects } from '@/hooks/use-projects';
import { useState } from 'react';

export default function ProjectsPage() {
  const { projects, loading, refreshProjects, createProject, updateProject, deleteProject } = useProjects();
  const { isPending: isCreating } = useProjects().createProjectMutation;
  const { isPending: isUpdating } = useProjects().updateProjectMutation;
  const { isPending: isDeleting } = useProjects().deleteProjectMutation;
  const [newProjectName, setNewProjectName] = useState('');
  const [editingProject, setEditingProject] = useState({ id: '', name: '' });
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      await createProject(newProjectName);
      setNewProjectName('');
      setIsCreateSheetOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject.name.trim()) return;
    try {
      await updateProject(editingProject.id, editingProject.name);
      setEditingProject({ id: '', name: '' });
      setIsEditSheetOpen(false);
      await refreshProjects();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    <div className="w-full py-">
      <Card className="p-4 shadow-sm border-slate-300/45 rounded-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
            <SheetTrigger asChild>
              <Button>New Project</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create New Project</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Input
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  disabled={isCreating}
                />
                <Button onClick={handleCreateProject} disabled={isCreating || !newProjectName.trim()}>
                  {isCreating ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    {new Date(project.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProject(project)}
                        >
                          Edit
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit Project</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <Input
                            placeholder="Project name"
                            value={editingProject.name}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                name: e.target.value,
                              })
                            }
                            disabled={isUpdating}
                          />
                          <Button onClick={handleUpdateProject} disabled={isUpdating || !editingProject.name.trim()}>
                            {isUpdating ? 'Updating...' : 'Update Project'}
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}