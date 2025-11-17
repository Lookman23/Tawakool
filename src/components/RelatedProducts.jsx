import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getRelatedProducts } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

const RelatedProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      const { data } = await getRelatedProducts(currentProductId, category);
      setProducts(data || []);
      setLoading(false);
    };
    fetchRelated();
  }, [currentProductId, category]);

  if (loading) return <LoadingSpinner />;
  if (products.length === 0) return null;

  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-center mb-8">Vous aimerez aussi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;