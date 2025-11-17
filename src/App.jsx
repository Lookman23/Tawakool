import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CookieBanner from '@/components/CookieBanner';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

// Public pages
const Home = lazy(() => import('@/pages/Home'));
const Catalog = lazy(() => import('@/pages/Catalog'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Confirmation = lazy(() => import('@/pages/Confirmation'));
const Contact = lazy(() => import('@/pages/Contact'));
const About = lazy(() => import('@/pages/About'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Tracking = lazy(() => import('@/pages/Tracking'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const ReturnPolicy = lazy(() => import('@/pages/ReturnPolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Auth pages
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Profile = lazy(() => import('@/pages/Profile'));

// Admin pages
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const ProductManager = lazy(() => import('@/pages/admin/ProductManager'));
const OrderManager = lazy(() => import('@/pages/admin/OrderManager'));
const CategoryManager = lazy(() => import('@/pages/admin/CategoryManager'));
const CustomerManager = lazy(() => import('@/pages/admin/CustomerManager'));
const SettingsManager = lazy(() => import('@/pages/admin/SettingsManager'));
const PromoManager = lazy(() => import('@/pages/admin/PromoManager'));
const ContentManager = lazy(() => import('@/pages/admin/ContentManager'));


const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    if (loading) return <LoadingSpinner />;
    if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
    return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalog />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/suivi-commande" element={<Tracking />} />
            <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
            <Route path="/cgv" element={<TermsOfService />} />
            <Route path="/politique-retours" element={<ReturnPolicy />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/compte" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="produits" element={<ProductManager />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="commandes" element={<OrderManager />} />
              <Route path="clients" element={<CustomerManager />} />
              <Route path="promotions" element={<PromoManager />} />
              <Route path="contenu" element={<ContentManager />} />
              <Route path="parametres" element={<SettingsManager />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CartDrawer />}
      <CookieBanner />
      <Toaster />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <WishlistProvider>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </WishlistProvider>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  </Router>
);

export default App;