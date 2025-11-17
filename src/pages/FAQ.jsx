import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/Breadcrumbs';

const faqData = [
  { category: 'Livraison', q: 'Quels sont les délais de livraison ?', a: 'La livraison à Abidjan prend généralement 2 à 3 jours ouvrables. Pour les autres villes, cela peut prendre jusqu\'à 5 jours.' },
  { category: 'Livraison', q: 'Quels sont les frais de livraison ?', a: 'La livraison est de 3 000 FCFA pour toute commande inférieure à 50 000 FCFA. Elle est gratuite pour les commandes supérieures.' },
  { category: 'Paiement', q: 'Quels sont les moyens de paiement acceptés ?', a: 'Nous acceptons le paiement à la livraison via Wave, Orange Money, MTN Money et Moov Money. Le paiement par carte bancaire sera bientôt disponible.' },
  { category: 'Retours', q: 'Puis-je retourner un article ?', a: 'Oui, vous avez 7 jours pour retourner un article. Il doit être dans son état d\'origine, non porté et avec les étiquettes. Les frais de retour sont à votre charge.' },
  { category: 'Produits', q: 'Vos produits sont-ils de bonne qualité ?', a: 'Absolument. Nous sélectionnons avec soin nos fournisseurs et nous engageons sur la qualité de chaque article proposé sur notre boutique.' },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFaqs = faqData.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>FAQ - MOH BOUTIQUE</title>
        <meta name="description" content="Trouvez les réponses à vos questions sur la livraison, les paiements, les retours et nos produits." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="text-center pt-8 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
            <p className="text-lg text-gray-600">Trouvez les réponses à vos interrogations.</p>
        </div>
        
        <div className="mb-8">
          <Input 
            placeholder="Rechercher une question..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Aucune question ne correspond à votre recherche.</p>
        )}
      </div>
    </>
  );
};

export default FAQ;