import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { validatePromoCode } from '@/lib/api';

const PromoCodeInput = ({ onApply }) => {
  const [code, setCode] = useState('');

  const handleApply = async () => {
    if (!code) return;
    const { data, error } = await validatePromoCode(code);
    if (data?.valid) {
      onApply(data);
      toast({ title: "Code promo appliqué !", description: `Vous bénéficiez de ${data.discount_percent}% de réduction.` });
    } else {
      toast({ title: "Code invalide", description: error, variant: "destructive" });
    }
  };

  return (
    <div className="flex gap-2">
      <Input 
        placeholder="Code promo" 
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button variant="outline" onClick={handleApply}>Appliquer</Button>
    </div>
  );
};

export default PromoCodeInput;