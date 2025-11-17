import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    const { error } = await signUp(data.email, data.password, { full_name: data.fullName });
    if (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Inscription réussie !',
        description: 'Un email de confirmation a été envoyé.',
      });
      navigate('/login');
    }
  };

  return (
    <>
      <Helmet>
        <title>Inscription - MOH BOUTIQUE</title>
      </Helmet>
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
            <CardDescription>Rejoignez-nous pour une expérience d'achat unique.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input id="fullName" {...register('fullName', { required: 'Le nom est requis' })} />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nom@exemple.com" {...register('email', { required: 'L\'email est requis' })} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" {...register('password', { required: 'Le mot de passe est requis', minLength: { value: 6, message: '6 caractères minimum' } })} />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Veuillez confirmer le mot de passe', validate: value => value === password || 'Les mots de passe ne correspondent pas' })} />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">S'inscrire</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-semibold text-amber-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;