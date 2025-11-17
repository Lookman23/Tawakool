import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ProductVariants = ({ variants, selectedVariants, onVariantChange }) => {
  if (!variants || variants.length === 0) return null;

  const groupedVariants = variants.reduce((acc, variant) => {
    acc[variant.type] = acc[variant.type] || [];
    acc[variant.type].push(variant);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedVariants).map(([type, options]) => (
        <div key={type}>
          <h3 className="text-sm font-medium text-gray-900 mb-3">{type}</h3>
          <RadioGroup
            defaultValue={selectedVariants[type]}
            onValueChange={(value) => onVariantChange(type, value)}
            className="flex flex-wrap gap-3"
          >
            {options.map((option) => (
              <div key={option.value}>
                <RadioGroupItem value={option.value} id={`${type}-${option.value}`} className="sr-only" />
                <Label
                  htmlFor={`${type}-${option.value}`}
                  className="flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 cursor-pointer data-[state=checked]:bg-amber-600 data-[state=checked]:text-white data-[state=checked]:border-amber-600"
                >
                  {option.value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;