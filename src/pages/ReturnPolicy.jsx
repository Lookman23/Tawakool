import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '@/components/Breadcrumbs';

const ReturnPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Retours - MOH BOUTIQUE</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose">
        <Breadcrumbs />
        <h1 className="mt-8">Politique de Retours</h1>
        <p className="text-sm text-gray-500">Dernière mise à jour : 12 novembre 2025</p>

        <h2>Conditions de retour</h2>
        <p>Vous disposez d'un délai de <strong>7 jours</strong> à compter de la date de réception de votre commande pour nous retourner un article.</p>
        <p>Pour être éligible à un retour, votre article doit répondre aux conditions suivantes :</p>
        <ul>
            <li>L'article doit être inutilisé et dans le même état où vous l'avez reçu.</li>
            <li>Il doit être dans son emballage d'origine.</li>
            <li>Toutes les étiquettes d'origine doivent être attachées.</li>
            <li>Les articles soldés ou en promotion ne sont pas éligibles au retour.</li>
        </ul>

        <h2>Processus de retour</h2>
        <p>Pour initier un retour, veuillez suivre ces étapes :</p>
        <ol>
            <li>Contactez notre service client par email à <strong>goloukmane@gmail.com</strong> ou par téléphone au <strong>0759122793</strong> en indiquant votre numéro de commande et le ou les articles que vous souhaitez retourner.</li>
            <li>Une fois votre demande approuvée, vous pourrez nous renvoyer l'article.</li>
            <li>Les frais de retour sont <strong>à la charge du client</strong>. Nous ne couvrons pas les frais d'expédition pour les retours.</li>
        </ol>

        <h2>Remboursement ou Avoir</h2>
        <p>Une fois votre retour reçu et inspecté, nous vous enverrons un email pour vous notifier que nous avons bien reçu l'article retourné. Nous vous informerons également de l'approbation ou du rejet de votre demande.</p>
        <p>Si votre demande est approuvée, nous procéderons à un <strong>avoir</strong> du montant de l'article, utilisable sur notre boutique pour un prochain achat. Nous n'effectuons pas de remboursement monétaire.</p>
      </div>
    </>
  );
};

export default ReturnPolicy;