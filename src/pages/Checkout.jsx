import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StepIndicator from '@/components/StepIndicator';
import PaymentMethods from '@/components/PaymentMethods';
import { toast } from '@/components/ui/use-toast';

const steps = [
  { id: '01', name: 'Informations' },
  { id: '02', name: 'Adresse' },
  { id: '03', name: 'Paiement' },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('wave');
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processOrder = async () => {
    const orderData = {
      ...formData,
      paymentMethod,
      items: cart,
      total: getCartTotal(),
    };
    
    toast({ title: "Traitement de la commande..." });
    const { data, error } = await createOrder(orderData);

    if (error) {
      toast({ title: "Erreur", description: "Impossible de passer la commande.", variant: "destructive" });
    } else {
      const orderId = data[0].id;
      clearCart();
      navigate(`/confirmation/${orderId}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Paiement - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <StepIndicator currentStep={currentStep} steps={steps} />
        </div>

        <form onSubmit={handleSubmit(handleNext)}>
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Vos informations</h2>
              <div className="space-y-4">
                <Input {...register("name", { required: "Le nom est requis" })} placeholder="Nom complet" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                <Input {...register("email", { required: "L'email est requis" })} type="email" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <Input {...register("phone", { required: "Le téléphone est requis" })} placeholder="Numéro de téléphone" />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Adresse de livraison</h2>
              <div className="space-y-4">
                <Input {...register("address", { required: "L'adresse est requise" })} placeholder="Adresse (ex: Rue, Immeuble)" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                <Input {...register("city", { required: "La ville est requise" })} placeholder="Ville / Commune" />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Méthode de paiement</h2>
              <p className="text-gray-600 mb-4">Paiement à la livraison via Mobile Money.</p>
              <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handlePrev}>Précédent</Button>
            )}
            <div className="flex-grow" />
            {currentStep < steps.length - 1 ? (
              <Button type="submit">Suivant</Button>
            ) : (
              <Button type="button" onClick={processOrder}>Confirmer la commande</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;