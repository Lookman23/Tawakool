import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
        setLoading(true);
        const { data } = await api.admin.getCustomers();
        setCustomers(data);
        setLoading(false);
    };
    fetchCustomers();
  }, []);

  return (
    <>
      <Helmet><title>Gestion des Clients - Admin</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <div className="bg-card rounded-lg overflow-hidden">
            <Table>
                <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Email</TableHead><TableHead>Téléphone</TableHead><TableHead>Inscrit le</TableHead></TableRow></TableHeader>
                <TableBody>
                    {loading ? <TableRow><TableCell colSpan={4} className="text-center">Chargement...</TableCell></TableRow> : customers.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </div>
    </>
  );
};

export default CustomerManager;