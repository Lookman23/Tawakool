import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const paymentMethods = [
  { id: 'wave', name: 'Wave', logo: '/src/assets/wave.svg' },
  { id: 'orange', name: 'Orange Money', logo: '/src/assets/orange-money.svg' },
  { id: 'mtn', name: 'MTN Money', logo: '/src/assets/mtn-money.svg' },
  { id: 'moov', name: 'Moov Money', logo: '/src/assets/moov-money.svg' },
];

const PaymentMethods = ({ onSelect, selected }) => {
  return (
    <RadioGroup defaultValue={selected} onValueChange={onSelect} className="space-y-4">
      {paymentMethods.map(method => (
        <Label key={method.id} htmlFor={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
          <RadioGroupItem value={method.id} id={method.id} />
          <img src={method.logo} alt={method.name} className="h-8 ml-4" />
          <span className="ml-4 font-medium">{method.name}</span>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default PaymentMethods;