import { useState, useEffect, useCallback } from 'react';
import { getCategories as fetchApiCategories } from '@/lib/api';
import { supabase } from '@/config/supabase';

const useMockData = !supabase;

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (useMockData) {
        data = await fetchApiCategories();
      } else {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        if (supabaseError) throw supabaseError;
        data = supabaseData;
      }
      setCategories(data || []);
    } catch (err) {
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};