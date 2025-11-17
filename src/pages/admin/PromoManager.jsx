import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';

const PromoManager = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();
  
  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    setLoading(true);
    const { data } = await api.admin.getPromoCodes();
    setPromos(data);
    setLoading(false);
  };
  
  const openModal = (promo = null) => {
    reset();
    setEditingPromo(promo);
    if(promo) {
        setValue('code', promo.code);
        setValue('discount_percent', promo.discount_percent);
        setValue('valid_to', promo.valid_to);
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    const action = editingPromo ? 'updatePromoCode' : 'addPromoCode';
    await api.admin[action]({ ...editingPromo, ...formData });
    toast({ title: `Code promo ${editingPromo ? 'modifié' : 'ajouté'} !`});
    fetchPromos();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Supprimer ce code promo ?")) {
        await api.admin.deletePromoCode(id);
        toast({ title: "Code promo supprimé" });
        fetchPromos();
    }
  };

  return (
    <>
      <Helmet><title>Gestion des Promotions - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des Promotions</h1>
          <Button onClick={() => openModal()}><PlusCircle className="mr-2 h-4 w-4" /> Ajouter un code promo</Button>
        </div>
        <div className="bg-card rounded-lg overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Réduction</TableHead><TableHead>Validité</TableHead><TableHead>Statut</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {loading ? <TableRow><TableCell colSpan={5}>Chargement...</TableCell></TableRow> : promos.map(promo => (
                <TableRow key={promo.id}>
                  <TableCell className="font-mono">{promo.code}</TableCell>
                  <TableCell>{promo.discount_percent ? `${promo.discount_percent}%` : `${promo.discount_fixed} FCFA`}</TableCell>
                  <TableCell>{promo.valid_to ? new Date(promo.valid_to).toLocaleDateString() : 'Aucune'}</TableCell>
                  <TableCell><Badge variant={promo.active ? 'success' : 'secondary'}>{promo.active ? 'Actif' : 'Inactif'}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => openModal(promo)}><Edit className="mr-2 h-4 w-4"/>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(promo.id)}><Trash2 className="mr-2 h-4 w-4"/>Supprimer</DropdownMenuItem>
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
          <DialogHeader><DialogTitle>{editingPromo ? 'Modifier' : 'Ajouter'} un code promo</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" {...register('code', { required: true })} />
             </div>
             <div className="space-y-2">
                <Label htmlFor="discount_percent">Réduction (%)</Label>
                <Input id="discount_percent" type="number" {...register('discount_percent', {valueAsNumber: true})} />
             </div>
              <div className="space-y-2">
                <Label htmlFor="valid_to">Date d'expiration</Label>
                <Input id="valid_to" type="date" {...register('valid_to')} />
             </div>
            <DialogFooter><Button type="submit">Sauvegarder</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromoManager;