import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const OrderTimeline = ({ status }) => {
    const statuses = ['En attente', 'Confirmée', 'Expédiée', 'Livrée'];
    const currentIndex = statuses.indexOf(status);

    return (
        <div className="p-4">
            <ol className="relative border-l border-gray-200">
                {statuses.map((s, index) => (
                    <li key={s} className={`ml-6 pb-10 ${index === statuses.length - 1 ? 'pb-0' : ''}`}>
                        <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                        </span>
                        <h3 className={`font-semibold ${index <= currentIndex ? 'text-gray-900' : 'text-gray-500'}`}>{s}</h3>
                        {index === currentIndex && <p className="text-sm text-gray-500">Statut actuel</p>}
                    </li>
                ))}
            </ol>
        </div>
    );
};


const Tracking = () => {
  const { register, handleSubmit } = useForm();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      if (data.orderId === 'MOH-12345') {
        setOrder({
          id: 'MOH-12345',
          date: '2025-11-10',
          status: 'Expédiée',
          total: 72000,
          items: [{ name: 'Robe Élégance Florale', quantity: 2 }],
          address: '2 Plateaux, Abidjan',
          deliveryEstimate: '13 novembre 2025',
        });
      } else {
        setOrder(null);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Suivi de Commande - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="text-center pt-8 pb-12">
          <h1 className="text-4xl font-bold">Suivre votre commande</h1>
          <p className="text-lg text-gray-600 mt-2">Entrez votre numéro de commande pour voir son statut.</p>
        </div>
        
        <Card className="max-w-lg mx-auto mb-12">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <Input {...register('orderId', { required: true })} placeholder="Ex: MOH-12345" />
                    <Button type="submit" disabled={loading}>
                        <Search className="h-4 w-4 mr-2" />
                        Suivre
                    </Button>
                </form>
            </CardContent>
        </Card>

        {loading && <p className="text-center">Recherche en cours...</p>}
        
        {order && (
          <Card>
            <CardHeader>
              <CardTitle>Commande #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold mb-4">Statut de la commande</h3>
                    <OrderTimeline status={order.status} />
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Détails</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>Date :</strong> {order.date}</p>
                        <p><strong>Total :</strong> {order.total.toLocaleString()} FCFA</p>
                        <p><strong>Adresse :</strong> {order.address}</p>
                        <p><strong>Livraison estimée :</strong> {order.deliveryEstimate}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Tracking;