import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PaymentMethods } from '@/components/PaymentMethods';
import { OrderSummary } from '@/components/OrderSummary';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const steps = [
  { id: 1, name: 'Informations', icon: ShoppingBag },
  { id: 2, name: 'Livraison', icon: Truck },
  { id: 3, name: 'Paiement', icon: CreditCard },
];

export const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Abidjan',
    postalCode: '',
    paymentMethod: 'wave',
  });
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const nextStep = async () => {
    const fieldsToValidate = [
      ['name', 'email', 'phone'],
      ['address', 'city'],
      [], // No validation for payment step
    ][currentStep];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev < steps.length ? prev + 1 : prev);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
  };
  
  const processData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    if(currentStep === steps.length -1) {
       // Final submission logic
       console.log("Final form data:", { ...formData, ...data });
       const orderId = `MOH-${Math.floor(Math.random() * 90000) + 10000}`;
       toast({
         title: "Commande confirmée !",
         description: `Votre commande #${orderId} a été passée avec succès.`,
       });
       clearCart();
       navigate('/confirmation', { state: { orderId, formData: { ...formData, ...data } } });
    } else {
        nextStep();
    }
  };

  const StepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div><Label htmlFor="name">Nom complet</Label><Input id="name" {...register('name', { required: 'Le nom est requis' })} />{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}</div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" {...register('email', { required: 'L\'email est requis', pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' } })} />{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}</div>
            <div><Label htmlFor="phone">Téléphone</Label><Input id="phone" {...register('phone', { required: 'Le téléphone est requis' })} />{errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}</div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div><Label htmlFor="address">Adresse de livraison</Label><Input id="address" {...register('address', { required: 'L\'adresse est requise' })} />{errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}</div>
            <div><Label htmlFor="city">Ville</Label><Input id="city" {...register('city', { required: 'La ville est requise' })} />{errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}</div>
            <div><Label htmlFor="postalCode">Code Postal (optionnel)</Label><Input id="postalCode" {...register('postalCode')} /></div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Choisissez votre moyen de paiement</h3>
            <PaymentMethods selected={formData.paymentMethod} onSelect={(method) => setFormData(p => ({...p, paymentMethod: method}))} />
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-r-lg">
                <p className="text-sm">Vous paierez votre commande en espèces ou par Mobile Money directement au livreur au moment de la réception de votre colis.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentStep >= index ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <step.icon className="w-5 h-5" />
                        </div>
                        <p className={`mt-2 text-sm font-medium ${currentStep >= index ? 'text-amber-600' : 'text-gray-500'}`}>{step.name}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 ${currentStep > index ? 'bg-amber-600' : 'bg-gray-200'}`}></div>}
                </React.Fragment>
            ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(processData)}>
          <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  <StepContent />
              </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}><ArrowLeft className="w-4 h-4 mr-2" />Précédent</Button>
              {currentStep < steps.length -1 ? (
                  <Button type="button" onClick={nextStep} className="bg-amber-600 hover:bg-amber-700">Suivant<ArrowRight className="w-4 h-4 ml-2" /></Button>
              ) : (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">Confirmer la commande</Button>
              )}
          </div>
      </form>
    </div>
  );
};