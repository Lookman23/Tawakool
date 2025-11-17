import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductById } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Breadcrumbs from '@/components/Breadcrumbs';
import ImageGallery from '@/components/ImageGallery';
import ProductVariants from '@/components/ProductVariants';
import ReviewSection from '@/components/ReviewSection';
import RelatedProducts from '@/components/RelatedProducts';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await getProductById(id);
      setProduct(data);
      // Set default variants
      if (data && data.variants) {
        const defaults = {};
        const grouped = data.variants.reduce((acc, v) => {
          acc[v.type] = acc[v.type] || [];
          acc[v.type].push(v);
          return acc;
        }, {});
        Object.keys(grouped).forEach(type => {
          defaults[type] = grouped[type][0].value;
        });
        setSelectedVariants(defaults);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleVariantChange = (type, value) => {
    setSelectedVariants(prev => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    const selectedVariantObjects = Object.entries(selectedVariants).map(([type, value]) => {
        return product.variants.find(v => v.type === type && v.value === value);
    });
    addToCart(product, 1, selectedVariantObjects);
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div>Produit non trouvé</div>;

  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <>
      <Helmet>
        <title>{product.name} - MOH BOUTIQUE</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs product={product} />
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <ImageGallery images={product.images} productName={product.name} />
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span className="ml-1">{product.rating} ({product.reviews.length} avis)</span>
              </div>
              {product.stock > 0 ? (
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">En stock</span>
              ) : (
                <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">Rupture de stock</span>
              )}
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} FCFA</span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">{product.original_price.toLocaleString()} FCFA</span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">{product.description.substring(0, 150)}...</p>
            
            <ProductVariants variants={product.variants} selectedVariants={selectedVariants} onVariantChange={handleVariantChange} />

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700" onClick={handleAddToCart} disabled={product.stock === 0}>
                Ajouter au panier
              </Button>
              <Button variant="outline" size="lg" onClick={() => toggleWishlist(product)}>
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" onClick={() => toast({ title: "Fonctionnalité à venir !" })}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="py-6">
              <p>Informations sur les détails techniques, matières, etc.</p>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <ReviewSection reviews={product.reviews} productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>
        
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
      
      {/* Sticky CTA on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
        <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleAddToCart} disabled={product.stock === 0}>
          Ajouter au panier
        </Button>
      </div>
    </>
  );
};

export default ProductDetail;