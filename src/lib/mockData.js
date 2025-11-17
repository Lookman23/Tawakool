import React from 'react';

export const mockProducts = [
  {
    id: 'prod_1',
    name: 'Robe Élégance Florale',
    description: 'Une robe d\'été légère et aérée avec un motif floral vibrant. Parfaite pour les sorties décontractées et les événements en journée. Tissu en coton respirant pour un confort maximal.',
    price: 25000,
    original_price: 35000,
    category: 'robes',
    stock: 15,
    badge: 'Promo',
    images: [
      'https://images.unsplash.com/photo-1595505122314-3455d59421b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1595505122314-3455d59421b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1595505122314-3455d59421b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1595505122314-3455d59421b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    ],
    variants: [
      { type: 'Taille', value: 'S', price_modifier: 0, stock: 5 },
      { type: 'Taille', value: 'M', price_modifier: 0, stock: 7 },
      { type: 'Taille', value: 'L', price_modifier: 0, stock: 3 },
      { type: 'Couleur', value: 'Bleu', price_modifier: 0 },
      { type: 'Couleur', value: 'Rouge', price_modifier: 1000 },
    ],
    rating: 4.5,
    reviews: [
      { id: 1, author: 'Aïcha K.', rating: 5, comment: 'Magnifique robe, très confortable !', date: '2025-10-20' },
      { id: 2, author: 'Fatou B.', rating: 4, comment: 'J\'adore le motif, mais la taille est un peu juste.', date: '2025-10-15' },
    ],
  },
  {
    id: 'prod_2',
    name: 'Chemise en Lin "Dakar"',
    description: 'Chemise en lin de haute qualité, idéale pour le climat chaud. Son style décontracté mais chic convient à toutes les occasions.',
    price: 18000,
    original_price: null,
    category: 'chemises',
    stock: 25,
    badge: 'Nouveau',
    images: [
      'https://images.unsplash.com/photo-1621335829175-95f4373a4d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1621335829175-95f4373a4d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    ],
    variants: [
      { type: 'Taille', value: 'M', price_modifier: 0, stock: 10 },
      { type: 'Taille', value: 'L', price_modifier: 0, stock: 10 },
      { type: 'Taille', value: 'XL', price_modifier: 2000, stock: 5 },
    ],
    rating: 4.8,
    reviews: [],
  },
  {
    id: 'prod_3',
    name: 'Pantalon Chino "Abidjan"',
    description: 'Un pantalon chino polyvalent qui allie confort et style. Parfait pour le bureau ou une sortie en ville.',
    price: 22000,
    original_price: 28000,
    category: 'pantalons',
    stock: 8,
    badge: 'Promo',
    images: [
      'https://images.unsplash.com/photo-1604176354204-926873782855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604176354204-926873782855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    ],
    variants: [],
    rating: 4.2,
    reviews: [],
  },
  {
    id: 'prod_4',
    name: 'Sac à main en cuir "Luxe"',
    description: 'Un sac à main en cuir véritable, spacieux et élégant. Le compagnon idéal pour toutes vos journées.',
    price: 45000,
    original_price: null,
    category: 'accessoires',
    stock: 5,
    badge: 'Coup de cœur',
    images: [
      'https://images.unsplash.com/photo-1590739241223-806b8820f743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1590739241223-806b8820f743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    ],
    variants: [],
    rating: 5,
    reviews: [],
  },
];

export const mockCategories = [
  { id: 'cat_1', name: 'Robes', slug: 'robes' },
  { id: 'cat_2', name: 'Chemises', slug: 'chemises' },
  { id: 'cat_3', name: 'Pantalons', slug: 'pantalons' },
  { id: 'cat_4', name: 'Accessoires', slug: 'accessoires' },
];

export const getProductById = (id) => {
  return mockProducts.find(p => p.id === id);
};

export const getRelatedProducts = (currentProductId, category) => {
  return mockProducts.filter(p => p.category === category && p.id !== currentProductId).slice(0, 4);
};