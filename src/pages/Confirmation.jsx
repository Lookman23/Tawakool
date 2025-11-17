import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Confirmation = () => {
  const { orderId } = useParams();

  return (
    <>
      <Helmet>
        <title>Commande Confirmée - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-2xl mx-auto text-center py-20 px-4">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
        <p className="text-gray-600 mb-2">Votre commande a été passée avec succès.</p>
        <p className="text-gray-800 font-semibold mb-8">Numéro de commande : <span className="text-amber-600">{orderId}</span></p>
        
        <div className="bg-gray-50 p-6 rounded-lg text-left mb-8">
            <h3 className="font-bold mb-2">Prochaines étapes :</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Vous recevrez bientôt un email de confirmation.</li>
                <li>Nous vous contacterons pour confirmer les détails de la livraison.</li>
                <li>Livraison estimée sous 2-3 jours ouvrables.</li>
            </ul>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
          <Link to="/suivi-commande">
            <Button variant="outline">Suivre ma commande</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Confirmation;