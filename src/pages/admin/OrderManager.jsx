import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await api.admin.getOrders();
    setOrders(data);
    setLoading(false);
  };
  
  const handleStatusChange = async (orderId, newStatus) => {
    await api.admin.updateOrderStatus(orderId, newStatus);
    toast({ title: "Statut de la commande mis à jour !" });
    fetchOrders();
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Livrée': return 'success';
      case 'Annulée': return 'destructive';
      case 'Expédiée': return 'default';
      default: return 'secondary';
    }
  }

  return (
    <>
      <Helmet><title>Gestion des Commandes - Admin</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Commandes</h1>
        <div className="bg-card rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Chargement...</TableCell></TableRow>
              ) : (
                orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerInfo.name}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{order.total.toLocaleString()} FCFA</TableCell>
                    <TableCell><Badge variant={getStatusVariant(order.status)}>{order.status}</Badge></TableCell>
                    <TableCell>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Changer statut</DropdownMenuLabel>
                          {['En attente', 'Confirmée', 'Expédiée', 'Livrée', 'Annulée'].map(status => (
                            <DropdownMenuItem key={status} onClick={() => handleStatusChange(order.id, status)}>
                              {status}
                            </DropdownMenuItem>
                          ))}
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
    </>
  );
};

export default OrderManager;