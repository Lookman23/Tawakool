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

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { error } = await signIn(data.email, data.password);
    if (error) {
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Connexion réussie !',
        description: 'Vous êtes maintenant connecté.',
      });
      navigate('/compte/profil');
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion - MOH BOUTIQUE</title>
      </Helmet>
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>Accédez à votre compte pour suivre vos commandes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nom@exemple.com" {...register('email', { required: 'L\'email est requis' })} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link to="#" className="text-sm text-amber-600 hover:underline">Mot de passe oublié ?</Link>
                </div>
                <Input id="password" type="password" {...register('password', { required: 'Le mot de passe est requis' })} />
                 {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">Se connecter</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="font-semibold text-amber-600 hover:underline">
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;