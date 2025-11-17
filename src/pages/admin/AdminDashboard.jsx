import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { DollarSign, Users, ShoppingCart, Package } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import SalesChart from '@/components/admin/SalesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data } = await api.admin.getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Chargement du tableau de bord...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Tableau de bord - Admin MOH BOUTIQUE</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Chiffre d'affaires total"
            value={`${stats.totalRevenue.toLocaleString()} FCFA`}
            icon={DollarSign}
            change="+20.1%"
            changeType="increase"
          />
          <StatsCard
            title="Clients"
            value={`+${stats.totalCustomers}`}
            icon={Users}
            change="+180.1%"
            changeType="increase"
          />
          <StatsCard
            title="Commandes"
            value={`+${stats.totalOrders}`}
            icon={ShoppingCart}
            change="+19%"
            changeType="increase"
          />
          <StatsCard
            title="Produits en stock"
            value={stats.productsInStock}
            icon={Package}
            change={`${stats.productsOutOfStock} en rupture`}
            changeType="decrease"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <SalesChart />
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Dernières commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.latestOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customerInfo.name}</div>
                        <div className="text-sm text-muted-foreground">{order.customerInfo.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Livrée' ? 'default' : 'secondary'}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total.toLocaleString()} FCFA</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;