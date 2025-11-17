import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Percent,
  FileText,
  Tags,
  LogOut,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/produits', icon: Package, label: 'Produits' },
  { href: '/admin/commandes', icon: ShoppingCart, label: 'Commandes' },
  { href: '/admin/clients', icon: Users, label: 'Clients' },
  { href: '/admin/categories', icon: Tags, label: 'Catégories' },
  { href: '/admin/promotions', icon: Percent, label: 'Promotions' },
  { href: '/admin/contenu', icon: FileText, label: 'Contenu' },
  { href: '/admin/parametres', icon: Settings, label: 'Paramètres' },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const content = (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link to="/admin" className="text-lg font-bold text-amber-600">
          MOH BOUTIQUE
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-6 w-6"/>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                location.pathname.startsWith(item.href) && 'bg-gray-100 text-gray-900'
              )}
              onClick={onClose}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
         <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r bg-white transform transition-transform md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r bg-white">
        {content}
      </aside>
    </>
  );
};

export default AdminSidebar;