import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // En mode démo, on accepte un mot de passe simple
    if (password === 'admin') {
      toast({ title: 'Connexion réussie', description: 'Bienvenue dans le panel admin.' });
      navigate('/admin/dashboard');
    } else {
      toast({ title: 'Erreur de connexion', description: 'Mot de passe incorrect.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="password" 
            placeholder="Mot de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
            Se connecter
          </Button>
        </form>
        <p className="text-xs text-center text-gray-500">Hint (démo): le mot de passe est "admin"</p>
      </div>
    </div>
  );
};

export default AdminAuth;