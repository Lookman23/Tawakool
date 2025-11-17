import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { useCategories } from '@/hooks/useCategories';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();
  const { categories } = useCategories();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await api.admin.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const openModal = (product = null) => {
    reset();
    setEditingProduct(product);
    if (product) {
      Object.keys(product).forEach(key => {
        setValue(key, product[key]);
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    const action = editingProduct ? 'updateProduct' : 'addProduct';
    const response = await api.admin[action]({ ...editingProduct, ...formData });
    if (!response.error) {
      toast({ title: `Produit ${editingProduct ? 'modifié' : 'ajouté'} avec succès !` });
      fetchProducts();
      setIsModalOpen(false);
    } else {
      toast({ title: "Erreur", description: response.error, variant: "destructive" });
    }
  };
  
  const handleDelete = async (id) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
        const { error } = await api.admin.deleteProduct(id);
        if(!error) {
            toast({ title: "Produit supprimé !" });
            fetchProducts();
        }
    }
  }

  return (
    <>
      <Helmet><title>Gestion des Produits - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des Produits</h1>
          <Button onClick={() => openModal()}><PlusCircle className="mr-2 h-4 w-4" /> Ajouter un produit</Button>
        </div>

        <div className="bg-card p-4 rounded-lg">
          <Input placeholder="Rechercher un produit..." className="max-w-sm" />
        </div>

        <div className="bg-card rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Chargement...</TableCell></TableRow>
              ) : (
                products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell><img src={product.product_images[0]?.image_url || '/placeholder.svg'} alt={product.name} className="w-16 h-16 object-cover rounded-md" /></TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openModal(product)}><Edit className="mr-2 h-4 w-4" /> Modifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.id)}><Trash2 className="mr-2 h-4 w-4" /> Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</DialogTitle>
            <DialogDescription>Remplissez les informations ci-dessous.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input id="name" {...register('name', { required: true })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" {...register('description')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Prix</Label>
              <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" type="number" {...register('stock', { required: true, valueAsNumber: true })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Catégorie</Label>
              <select id="category" {...register('category')} className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <DialogFooter>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductManager;