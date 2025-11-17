import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await api.admin.getCategories();
    setCategories(data);
    setLoading(false);
  };

  const openModal = (category = null) => {
    reset();
    setEditingCategory(category);
    if (category) {
      Object.keys(category).forEach(key => setValue(key, category[key]));
    }
    setIsModalOpen(true);
  };
  
  const onSubmit = async (formData) => {
    const action = editingCategory ? 'updateCategory' : 'addCategory';
    const { error } = await api.admin[action]({ ...editingCategory, ...formData, slug: formData.name.toLowerCase().replace(/ /g, '-') });
    if (!error) {
      toast({ title: `Catégorie ${editingCategory ? 'modifiée' : 'ajoutée'} !` });
      fetchCategories();
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      await api.admin.deleteCategory(id);
      toast({ title: "Catégorie supprimée" });
      fetchCategories();
    }
  };

  return (
    <>
      <Helmet><title>Gestion des Catégories - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des Catégories</h1>
          <Button onClick={() => openModal()}><PlusCircle className="mr-2 h-4 w-4" /> Ajouter une catégorie</Button>
        </div>
        <div className="bg-card rounded-lg overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Slug</TableHead><TableHead><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
            <TableBody>
              {loading ? <TableRow><TableCell colSpan={3} className="text-center">Chargement...</TableCell></TableRow> : categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openModal(category)}><Edit className="mr-2 h-4 w-4" /> Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(category.id)}><Trash2 className="mr-2 h-4 w-4" /> Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCategory ? 'Modifier' : 'Ajouter'} une catégorie</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...register('name', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register('description')} />
            </div>
            <DialogFooter><Button type="submit">Sauvegarder</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryManager;