import React from 'react';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
    });
    e.target.reset();
  };

  const contactInfo = [
    { icon: Phone, text: "0759122793", href: "tel:0759122793" },
    { icon: Mail, text: "goloukmane@gmail.com", href: "mailto:goloukmane@gmail.com" },
    { icon: MapPin, text: "2 Plateaux, Clinique le Rocher, Quartier Paillet, derrière HMA" },
    { icon: Clock, text: "Lun-Ven 9h-17h, Samedi 10h-15h" }
  ];

  return (
    <>
      <Helmet>
        <title>Contact - MOH BOUTIQUE</title>
        <meta name="description" content="Contactez MOH BOUTIQUE. Retrouvez notre adresse, téléphone, email et horaires d'ouverture à Abidjan." />
      </Helmet>
      <div className="bg-background">
        <div className="text-center pt-16 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Une question ? Une suggestion ? Nous sommes là pour vous aider.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 p-8 md:p-12 rounded-2xl">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyer un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input placeholder="Votre nom" required />
                  <Input type="email" placeholder="Votre email" required />
                </div>
                <Input placeholder="Sujet" required />
                <Textarea placeholder="Votre message" rows={5} required />
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-amber-100 text-amber-600 rounded-full p-3">
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-gray-700 hover:text-amber-600 transition-colors pt-2">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-700 pt-2">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Suivez-nous</h3>
                 <div className="flex space-x-4">
                    <a href="https://wa.me/2250759122793" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full justify-center">WhatsApp</Button>
                    </a>
                    <a href="tel:0759122793">
                      <Button variant="outline" className="w-full justify-center">Appeler</Button>
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};