import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/config/supabase';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsObj = {};
      data?.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key, defaultValue = '') => {
    return settings[key] || defaultValue;
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      loading,
      getSetting,
      refreshSettings: fetchSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};