import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page non trouvée</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Frown className="h-24 w-24 text-amber-500 mb-6" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4 mb-2">Page non trouvée</h2>
        <p className="text-gray-500 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;