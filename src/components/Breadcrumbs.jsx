import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ product }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'catalogue': 'Catalogue',
    'produit': product ? product.name : 'Produit',
    'panier': 'Panier',
    'checkout': 'Paiement',
    'a-propos': 'À Propos',
    'contact': 'Contact',
    'faq': 'FAQ',
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-600">
            Accueil
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {name}
                  </span>
                ) : (
                  <Link to={to} className="ml-1 text-sm font-medium text-gray-700 hover:text-amber-600 md:ml-2">
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;