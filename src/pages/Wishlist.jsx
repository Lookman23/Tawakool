import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <Helmet>
        <title>Ma Wishlist - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold my-8">Ma Wishlist</h1>
        
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <HeartCrack className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Votre wishlist est vide</h2>
            <p className="text-gray-500 mb-6">Ajoutez des articles que vous aimez pour les retrouver plus tard.</p>
            <Link to="/catalogue">
              <Button>Découvrir les produits</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;