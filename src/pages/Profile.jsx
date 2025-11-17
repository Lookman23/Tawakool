import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, ShoppingBag, Heart, MapPin, Edit } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Déconnexion réussie.' });
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data
  const orders = [
    { id: 'MOH-12345', date: '10 Nov 2025', total: '45,000 FCFA', status: 'Livrée' },
    { id: 'MOH-67890', date: '12 Nov 2025', total: '22,500 FCFA', status: 'Expédiée' },
  ];
  const addresses = [
    { id: 1, name: 'Domicile', address: '2 Plateaux, Quartier Paillet', city: 'Abidjan' },
  ];

  return (
    <>
      <Helmet>
        <title>Mon Compte - MOH BOUTIQUE</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Mon Compte</h1>
            <Button onClick={handleSignOut} variant="outline"><LogOut className="w-4 h-4 mr-2" />Déconnexion</Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profil</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingBag className="w-4 h-4 mr-2" />Commandes</TabsTrigger>
            <TabsTrigger value="wishlist"><Heart className="w-4 h-4 mr-2" />Wishlist</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="w-4 h-4 mr-2" />Adresses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de compte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Nom :</strong> {user.user_metadata?.full_name || 'Non défini'}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Téléphone :</strong> {user.phone || 'Non défini'}</p>
                <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Modifier le profil</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Historique des commandes</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-bold">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.total}</p>
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <Card>
                <CardHeader><CardTitle>Ma Wishlist</CardTitle></CardHeader>
                <CardContent>
                    {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlist.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                    ) : <p>Votre wishlist est vide.</p>}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Adresses de livraison</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {addresses.map(addr => (
                  <div key={addr.id} className="p-4 border rounded-lg">
                    <p className="font-bold">{addr.name}</p>
                    <p>{addr.address}, {addr.city}</p>
                  </div>
                ))}
                <Button variant="outline">Ajouter une nouvelle adresse</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;