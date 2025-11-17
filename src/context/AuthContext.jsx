import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/config/supabase';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (supabase) {
      // Check active session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (_event === 'SIGNED_IN') {
           // On login, check for mock admin user
           if (session?.user?.email === 'admin@moh.com') {
               setUser(prev => ({...prev, roles: ['admin']}));
           }
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Mock user for local development without Supabase
      try {
        const mockUserStr = localStorage.getItem('mockUser');
        if (mockUserStr) {
            setUser(JSON.parse(mockUserStr));
        }
      } catch (error) {
        console.error("Failed to parse mock user from localStorage", error);
        localStorage.removeItem('mockUser');
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    if (!supabase) {
      // Mock sign-in logic
      if ((email === 'user@moh.com' || email === 'admin@moh.com') && password === 'password') {
        const mockUserData = {
          id: email === 'admin@moh.com' ? 'mock-admin-id' : 'mock-user-id',
          email: email,
          user_metadata: { full_name: email === 'admin@moh.com' ? 'Admin MOH' : 'Utilisateur Test' },
          roles: email === 'admin@moh.com' ? ['admin'] : []
        };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        return { data: { user: mockUserData }, error: null };
      }
      return { data: null, error: { message: 'Identifiants invalides.' } };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) {
      toast({ title: 'Fonctionnalité désactivée', description: 'L\'inscription est désactivée en mode démo.', variant: 'destructive' });
      return { data: null, error: { message: 'Supabase client is not available.' } };
    }
    return await supabase.auth.signUp({ email, password, options: { data: metadata } });
  };

  const signOut = async () => {
     if (!supabase) {
        // Mock sign-out
        setUser(null);
        localStorage.removeItem('mockUser');
        return { error: null };
     }
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};