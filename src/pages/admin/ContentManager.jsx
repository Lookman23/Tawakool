import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ContentManager = () => {
  const NotImplemented = () => (
    <div className="bg-card p-8 rounded-lg text-center mt-4">
      <p className="text-muted-foreground">Cette section est en cours de développement.</p>
    </div>
  );

  return (
    <>
      <Helmet><title>Gestion du Contenu - Admin</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestion du Contenu</h1>
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            <TabsTrigger value="legal">Pages Légales</TabsTrigger>
          </TabsList>
          <TabsContent value="faq"><NotImplemented /></TabsContent>
          <TabsContent value="blog"><NotImplemented /></TabsContent>
          <TabsContent value="testimonials"><NotImplemented /></TabsContent>
          <TabsContent value="legal"><NotImplemented /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ContentManager;