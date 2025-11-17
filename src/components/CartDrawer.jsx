import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, isDrawerOpen, setIsDrawerOpen } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Panier ({cart.length})</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-2">Votre panier est vide</p>
                  <Button
                    onClick={() => setIsDrawerOpen(false)}
                    variant="outline"
                  >
                    Continuer vos achats
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const mainImage = item.product_images?.find(img => img.is_main)?.image_url || 
                                    item.product_images?.[0]?.image_url;
                    const itemPrice = item.variant?.price_modifier 
                      ? item.price + item.variant.price_modifier 
                      : item.price;

                    return (
                      <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex gap-4 pb-4 border-b">
                        <img
                          src={mainImage}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          {item.variant && (
                            <p className="text-xs text-gray-500 mb-2">
                              {item.variant.type}: {item.variant.value}
                            </p>
                          )}
                          <p className="font-bold text-sm">{itemPrice.toLocaleString()} FCFA</p>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => removeFromCart(item.id, item.variant)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{getCartTotal().toLocaleString()} FCFA</span>
                </div>

                <Link to="/checkout" onClick={() => setIsDrawerOpen(false)}>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Passer au paiement
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Continuer vos achats
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;