import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '@/components/Breadcrumbs';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose">
        <Breadcrumbs />
        <h1 className="mt-8">Politique de Confidentialité</h1>
        <p className="text-sm text-gray-500">Dernière mise à jour : 12 novembre 2025</p>

        <h2>1. Collecte de l'information</h2>
        <p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, et/ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone, et votre adresse de livraison.</p>

        <h2>2. Utilisation des informations</h2>
        <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
        <ul>
          <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
          <li>Fournir un contenu publicitaire personnalisé</li>
          <li>Améliorer notre site Web</li>
          <li>Améliorer le service client et vos besoins de prise en charge</li>
          <li>Vous contacter par e-mail</li>
          <li>Administrer un concours, une promotion, ou une enquête</li>
        </ul>

        <h2>3. Confidentialité du commerce en ligne</h2>
        <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.</p>

        <h2>4. Divulgation à des tiers</h2>
        <p>Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierces parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>

        <h2>5. Protection des informations</h2>
        <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.</p>

        <h2>6. Consentement</h2>
        <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
      </div>
    </>
  );
};

export default PrivacyPolicy;