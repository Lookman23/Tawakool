import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { createReview } from '@/lib/api';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-amber-500 fill-amber-500" />)}
      {halfStar && <StarHalf className="h-5 w-5 text-amber-500 fill-amber-500" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
    </div>
  );
};

const ReviewSection = ({ reviews, productId }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await createReview({ ...data, productId, rating: 5 }); // Mock rating
    toast({
      title: "Avis soumis !",
      description: "Merci pour votre retour.",
    });
    reset();
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold mb-6">Avis des clients</h3>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} />
                  <p className="ml-4 font-bold">{review.author}</p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun avis pour ce produit pour le moment.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6">Laissez votre avis</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("author", { required: true })} placeholder="Votre nom" />
          <Textarea {...register("comment", { required: true })} placeholder="Votre commentaire..." />
          <Button type="submit">Soumettre l'avis</Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;