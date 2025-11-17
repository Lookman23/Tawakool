import React from 'react';
import { Button } from '@/components/ui/button';
import PromoCodeInput from '@/components/PromoCodeInput';
import { Link } from 'react-router-dom';

const OrderSummary = ({ cart, getCartTotal, onPromoApply, discount, checkoutPath = "/checkout" }) => {
  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 3000; // Free shipping over 50,000
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-6">
      <h2 className="text-xl font-bold">Résumé de la commande</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between">
          <span>Livraison</span>
          <span>{shipping > 0 ? `${shipping.toLocaleString()} FCFA` : 'Gratuite'}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction</span>
            <span>-{discount.toLocaleString()} FCFA</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toLocaleString()} FCFA</span>
        </div>
      </div>

      <PromoCodeInput onApply={onPromoApply} />

      <Link to={checkoutPath}>
        <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700">
          Passer au paiement
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummary;