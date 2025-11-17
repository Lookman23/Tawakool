import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw, Headphones, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const Home = () => {
  const { products, loading } = useProducts({ limit: 6 });

  const features = [
    { icon: Truck, title: 'Livraison rapide', description: '2-3 jours ouvrables à Abidjan' },
    { icon: RotateCcw, title: 'Retours simples', description: 'Garantie 7 jours' },
    { icon: Headphones, title: 'Service client', description: 'Disponible 6j/7' },
    { icon: Shield, title: 'Paiement sécurisé', description: 'Mobile Money & Stripe' }
  ];

  return (
    <>
      <SEO 
        title="Accueil"
        description="MOH BOUTIQUE - Découvrez les dernières tendances mode à Abidjan. Vêtements, accessoires et plus encore. Livraison rapide et paiement sécurisé."
      />
      <div className="min-h-screen">
        <section className="relative h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          <div className="absolute inset-0">
             <img alt="Hero fashion banner" class="w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1677078935584-c617ff656924" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Votre style, <span className="text-amber-600">notre passion</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Découvrez notre collection exclusive de vêtements et accessoires tendance à Abidjan.
              </p>
              <Link to="/catalogue">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg">
                  Découvrir nos produits <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Offres du moment</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Découvrez notre sélection de produits tendance et profitez de nos meilleures offres.</p>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
            <div className="text-center mt-12">
              <Link to="/catalogue"><Button variant="outline" size="lg">Voir tout le catalogue <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Notre histoire</h2>
                <p className="text-gray-600 mb-4">MOH BOUTIQUE est née d'une passion pour la mode et le style. Située au cœur d'Abidjan, nous nous engageons à offrir à nos clients des produits de qualité qui reflètent les dernières tendances internationales.</p>
                <p className="text-gray-600 mb-6">Notre mission est de rendre la mode accessible à tous, avec un service client exceptionnel et une expérience d'achat unique.</p>
                <Link to="/a-propos"><Button variant="outline">En savoir plus <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-96 rounded-2xl overflow-hidden">
                <img alt="MOH Boutique store interior" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1530611183773-0dccbb8740df" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;