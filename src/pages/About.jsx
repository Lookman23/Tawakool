import React from 'react';
import { Helmet } from 'react-helmet';
import { Award, Target, Users } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const About = () => {
  return (
    <>
      <Helmet>
        <title>À Propos - MOH BOUTIQUE</title>
        <meta name="description" content="Découvrez l'histoire, la mission et les valeurs de MOH BOUTIQUE, votre destination mode à Abidjan." />
      </Helmet>
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs />
        </div>
        <div className="text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Notre Histoire</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plus qu'une simple boutique, une passion pour le style et l'élégance.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">De l'idée à la réalité</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                MOH BOUTIQUE est née en 2024 d'un rêve simple : rendre la mode de qualité accessible à toutes et à tous à Abidjan. Frustrés par le manque d'options alliant tendances actuelles, qualité durable et prix justes, nous avons décidé de créer notre propre espace.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chaque pièce de notre collection est soigneusement sélectionnée pour son style, son confort et sa capacité à vous faire sentir unique. Nous croyons que la mode est une forme d'expression personnelle, et notre mission est de vous fournir les outils pour raconter votre propre histoire.
              </p>
            </div>
            <div className="order-1 lg:order-2">
                <img class="rounded-2xl shadow-lg w-full h-auto" alt="Atelier de mode lumineux et moderne" src="https://images.unsplash.com/photo-1702846196370-f717f45999fa" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-amber-100 rounded-full p-4 mb-4">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Qualité</h3>
                <p className="text-gray-600">Nous sélectionnons des matériaux durables et des coupes impeccables pour des vêtements qui durent.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-amber-100 rounded-full p-4 mb-4">
                  <Target className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Style</h3>
                <p className="text-gray-600">Nos collections sont à la pointe des tendances tout en restant intemporelles et élégantes.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-amber-100 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Communauté</h3>
                <p className="text-gray-600">Nous sommes plus qu'une boutique, nous sommes une famille qui partage une passion pour la mode.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;