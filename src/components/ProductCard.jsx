import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const mainImage = product.product_images?.find(img => img.is_main)?.image_url || 
                    product.product_images?.[0]?.image_url;
  const hoverImage = product.product_images?.[1]?.image_url;

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <Link to={`/produit/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
          />
        </Button>

        {/* Quick Add Button */}
        <Button
          className="absolute bottom-3 left-3 right-3 bg-gray-900 hover:bg-amber-600 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au panier
        </Button>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/produit/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString()} FCFA
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.original_price.toLocaleString()} FCFA
            </span>
          )}
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-600 mt-2">Plus que {product.stock} en stock !</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 mt-2">Rupture de stock</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;