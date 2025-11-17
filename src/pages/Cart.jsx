import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import OrderSummary from '@/components/OrderSummary';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [discount, setDiscount] = useState(0);

  const handlePromoApply = (promoData) => {
    const subtotal = getCartTotal();
    if (promoData.discount_percent) {
      setDiscount((subtotal * promoData.discount_percent) / 100);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 mb-6">Parcourez nos collections pour trouver votre bonheur.</p>
        <Link to="/catalogue">
          <Button>Continuer vos achats</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Votre Panier - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold my-8">Votre Panier</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-6">
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center border rounded-lg w-fit">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="font-bold">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:sticky top-24 h-fit">
            <OrderSummary cart={cart} getCartTotal={getCartTotal} onPromoApply={handlePromoApply} discount={discount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;