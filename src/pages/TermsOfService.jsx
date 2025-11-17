import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '@/components/Breadcrumbs';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose">
        <Breadcrumbs />
        <h1 className="mt-8">Conditions Générales de Vente</h1>
        <p className="text-sm text-gray-500">Dernière mise à jour : 12 novembre 2025</p>

        <h2>Article 1 : Objet</h2>
        <p>Les présentes conditions régissent les ventes par la société MOH BOUTIQUE de vêtements et accessoires.</p>

        <h2>Article 2 : Prix</h2>
        <p>Les prix de nos produits sont indiqués en francs CFA (FCFA) toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>

        <h2>Article 3 : Commandes</h2>
        <p>Vous pouvez passer commande sur notre site internet. Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>

        <h2>Article 4 : Validation de votre commande</h2>
        <p>Toute commande figurant sur le site Internet MOH BOUTIQUE suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.</p>

        <h2>Article 5 : Paiement</h2>
        <p>Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le paiement s'effectue à la livraison par les moyens de paiement mobile proposés (Wave, Orange Money, etc.).</p>

        <h2>Article 6 : Rétractation et Retours</h2>
        <p>Conformément à notre Politique de Retours, vous disposez d'un délai de 7 jours à compter de la réception de vos produits pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité. Les frais de retour sont à votre charge.</p>

        <h2>Article 7 : Responsabilité</h2>
        <p>Les produits proposés sont conformes à la législation ivoirienne en vigueur. La responsabilité de la société MOH BOUTIQUE ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré.</p>
      </div>
    </>
  );
};

export default TermsOfService;