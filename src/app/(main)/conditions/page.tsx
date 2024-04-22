const ConditionsPage = () => {
    return (
        <div className={"pt-24 md:pt-40 pb-20 mx-4 md:mx-16"}>
            <h1 className={"h3"}>Conditions générales {"d'utilisation"}</h1>

            <div>
                <h3 className={"h4 my-2"}>1. Objet</h3>

                <p>Les présentes Conditions Générales {"d'Utilisation"} définissent les conditions dans lesquelles les
                    utilisateurs accèdent et utilisent le site web {"d'Amiens"} Food.</p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>2. Utilisation du Site</h3>

                <p>Les utilisateurs {"s'engagent"} à utiliser le site web {"d'Amiens"} Food conformément à sa finalité
                    et aux lois en vigueur. Toute utilisation abusive ou illicite du site est strictement interdite.</p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>3. Propriété Intellectuelle</h3>

                <p>
                    Le contenu du site web {"d'Amiens"} Food (textes, images, vidéos, etc.) est protégé par le droit de
                    la
                    propriété intellectuelle. Toute reproduction ou représentation totale ou partielle de ce contenu est
                    interdite sans autorisation préalable {"d'Amiens Food"}.
                </p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>4. Responsabilité</h3>

                <p>
                    Amiens Food {"s'efforce"} de fournir des informations exactes et à jour sur son site web, mais ne
                    peut
                    garantir {"l'exactitude"}, {"l'exhaustivité"} ou la pertinence de ces informations. En conséquence,
                    la
                    responsabilité {"d'Amiens"} Food ne saurait être engagée en cas de préjudice direct ou indirect
                    résultant de {"l'utilisation du site"}.
                </p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>5. Modifications des Conditions</h3>

                <p>
                    Nous nous réservons le droit de modifier ces conditions {"d'utilisation"} à tout moment. Les
                    modifications prendront effet dès leur publication sur notre site. Il est de votre responsabilité de
                    consulter régulièrement ces conditions pour être informé des éventuelles mises à jour.

                    En utilisant notre site et nos services, vous acceptez pleinement ces conditions {"d'utilisation"}.

                    Pour toute question concernant ces conditions {"d'utilisation"}, veuillez nous contacter
                    à {"l'adresse "}
                    suivante : contact@amiensfood.com
                </p>
            </div>

            <hr className={"mt-6"}/>

            <h1 className={"h3 mt-6"}>Conditions générales de vente</h1>

            <div>
                <h3 className={"h4 my-2"}>1. Objet</h3>

                <p>Les présentes Conditions Générales de Vente définissent les conditions dans lesquelles Amiens Food
                    propose à ses utilisateurs {"l'achat de l'abonnement"} annuel offrant des réductions dans les
                    restaurants partenaires.</p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>2. Abonnement Annuel</h3>

                <div className={"ml-8"}>
                    <h6 className={"text-xl font-bold my-4"}>2.1 Description du service</h6>

                    <p>{"L'abonnement"} annuel proposé par Amiens Food donne accès à une carte permettant à son
                        détenteur de
                        bénéficier de réductions dans les restaurants partenaires de la plateforme.</p>


                    <h6 className={"text-xl font-bold my-4"}>2.2 Prix de paiement</h6>

                    <p>Le prix de {"l'abonnement annuel est indiqué sur le site web d'Amiens"} Food et est payable en
                        totalité lors de la souscription à {"l'abonnement"} via le service Stripe.</p>

                    <h6 className={"text-xl font-bold my-4"}>2.3 Livraison</h6>

                    <p>{"L'abonnement"} annuel sera activé immédiatement après la confirmation du paiement.</p>


                    <h6 className={"text-xl font-bold my-4"}>2.4 Durée de {"l'abonnement"}</h6>

                    <p>{"L'abonnement"} annuel est valable pour une durée de 12 mois à compter de la date de
                        souscription.
                        Il est renouvelable automatiquement pour une période {"d'un"} an, sauf résiliation par
                        {"l'utilisateur"}.</p>
                </div>

            </div>
        </div>
    )
}

export default ConditionsPage
