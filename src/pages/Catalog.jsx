import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Catalog = () => {
  const [filters, setFilters] = useState({
    categories: [],
    maxPrice: 500000,
    inStock: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const { products: allProducts, loading: productsLoading } = useProducts(filters);
  const { categories, loading: categoriesLoading } = useCategories();

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ categories: [], maxPrice: 500000, inStock: false });
  };

  const sortedProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [allProducts, sortBy]);

  const FilterSidebar = () => (
    <div className="bg-white rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg">Filtres</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>Réinitialiser</Button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Catégories</h3>
        <div className="space-y-3">
          {categoriesLoading ? <p className="text-sm text-gray-500">Chargement...</p> : categories.map(cat => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox id={`cat-${cat.id}`} checked={filters.categories.includes(cat.id)} onCheckedChange={() => handleCategoryChange(cat.id)} aria-label={`Filtrer par ${cat.name}`}/>
              <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal cursor-pointer">{cat.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Prix Maximum</h3>
        <Slider min={0} max={500000} step={5000} value={[filters.maxPrice]} onValueChange={([value]) => handleFilterChange('maxPrice', value)} className="mb-2" aria-label="Curseur de prix"/>
        <div className="flex justify-between text-sm text-gray-600">
          <span>0 FCFA</span>
          <span>{filters.maxPrice.toLocaleString()} FCFA</span>
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={filters.inStock} onCheckedChange={(checked) => handleFilterChange('inStock', checked)} aria-label="Afficher uniquement les produits en stock"/>
          <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">En stock uniquement</Label>
        </div>
      </div>
    </div>
  );
  
  const loading = productsLoading || categoriesLoading;

  return (
    <>
      <SEO
        title="Catalogue"
        description="Parcourez notre catalogue complet de vêtements et accessoires mode à Abidjan."
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs />
        </div>
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Catalogue</h1>
            <p className="text-gray-600">Découvrez notre collection complète</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0"><FilterSidebar /></aside>
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
                <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(true)} aria-label="Ouvrir les filtres"><Filter className="h-4 w-4 mr-2" />Filtres</Button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-2 text-sm focus:ring-amber-500 focus:border-amber-500" aria-label="Trier les produits">
                    <option value="relevance">Pertinence</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                </div>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />)}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <p className="text-gray-500 mb-4">Aucun produit ne correspond à vos filtres.</p>
                  <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed left-0 top-0 h-full w-full max-w-sm bg-white z-50 p-6 overflow-y-auto lg:hidden" role="dialog" aria-modal="true">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Filtres</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} aria-label="Fermer les filtres"><X className="h-5 w-5" /></Button>
                </div>
                <FilterSidebar />
                <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700" onClick={() => setShowFilters(false)}>Voir les résultats</Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Catalog;