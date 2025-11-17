import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';

const SettingsManager = () => {
  const handleSave = async (e) => {
    e.preventDefault();
    // In a real app, you would gather data from a form state
    const settingsData = { mockSetting: "mockValue" }; 
    const { error } = await api.admin.saveSettings(settingsData);
    if (!error) {
      toast({ title: "Paramètres sauvegardés !", description: "Les modifications ont été enregistrées (simulation)." });
    }
  };

  const NotImplemented = () => (
    <div className="bg-card p-8 rounded-lg text-center mt-4">
        <p className="text-muted-foreground">Cette section est en cours de développement.</p>
    </div>
  );

  return (
    <>
      <Helmet><title>Paramètres du Site - Admin</title></Helmet>
      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Paramètres du Site</h1>
            <Button type="submit">Sauvegarder les changements</Button>
          </div>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="theme">Thème</TabsTrigger>
              <TabsTrigger value="content">Textes</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
              <TabsTrigger value="banner">Bannière</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <div className="space-y-4 p-4 bg-card mt-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>Nom du site</Label>
                        <Input defaultValue="MOH BOUTIQUE" />
                    </div>
                    <div className="space-y-2">
                        <Label>Slogan</Label>
                        <Input defaultValue="Votre style, notre passion" />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <Input type="file" />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="theme"><NotImplemented /></TabsContent>
            <TabsContent value="content"><NotImplemented /></TabsContent>
            <TabsContent value="images"><NotImplemented /></TabsContent>
            <TabsContent value="contact"><NotImplemented /></TabsContent>
            <TabsContent value="payments"><NotImplemented /></TabsContent>
            <TabsContent value="features"><NotImplemented /></TabsContent>
            <TabsContent value="banner"><NotImplemented /></TabsContent>
          </Tabs>
        </div>
      </form>
    </>
  );
};

export default SettingsManager;