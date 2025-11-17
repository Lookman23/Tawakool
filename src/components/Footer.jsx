import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez nos dernières offres par email",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">MOH BOUTIQUE</h3>
            <p className="text-sm mb-4">
              Votre destination mode à Abidjan. Qualité, style et service client exceptionnel depuis 2024.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Accueil</Link></li>
              <li><Link to="/catalogue" className="hover:text-amber-500 transition-colors">Catalogue</Link></li>
              <li><Link to="/a-propos" className="hover:text-amber-500 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-amber-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>2 Plateaux, Clinique le Rocher, Quartier Paillet, derrière HMA, Abidjan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-amber-500" />
                <span>0759122793</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-amber-500" />
                <span>goloukmane@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Lun-Ven: 9h-17h</p>
                  <p>Samedi: 10h-15h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Recevez nos dernières offres et nouveautés</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-center mb-4">Moyens de paiement acceptés</p>
          <div className="flex justify-center items-center space-x-6 flex-wrap gap-4">
            <span className="text-sm font-medium">Wave</span>
            <span className="text-sm font-medium">Orange Money</span>
            <span className="text-sm font-medium">MTN Money</span>
            <span className="text-sm font-medium">Moov Money</span>
            <span className="text-sm font-medium">Djamo</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 MOH BOUTIQUE. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/politique-confidentialite" className="hover:text-amber-500 transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/cgv" className="hover:text-amber-500 transition-colors">
              CGV
            </Link>
            <Link to="/politique-retours" className="hover:text-amber-500 transition-colors">
              Retours
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;