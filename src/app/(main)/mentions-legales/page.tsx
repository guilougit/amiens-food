const LegalPage = () => {
    return (
        <div className={"pt-24 md:pt-40 pb-20 mx-4 md:mx-16"}>
            <h1 className={"h3"}>Mentions légales </h1>


            <div>
                <h3 className={"h4 my-2"}>Éditeur du site</h3>

                <p>Ce site est édité par Amiens food.</p>

                <ul>
                    <li>Adresse postale : 974 R RUE DE SACY 60680 GRANDFRESNOY</li>
                    <li>Email : contact@amiensfood.com</li>

                    <li className={"mt-4"}>Numéro {"d'identification"} : 92221398800012</li>
                </ul>
            </div>

            <div>
                <h3 className={"h4 my-2"}>Développeurs du site</h3>

                <p className={"text-sm"}>Ce site a été réalisé par Rémy CASTRO et Guilhem DECLERCQ</p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>Hébergement</h3>

                <p>Ce site a été réalisé par la société Vercel Inc.</p>

                <ul>
                    <li>Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789</li>
                    <li>Téléphone : (559) 288-7060</li>
                </ul>
            </div>

            <div>
                <h3 className={"h4 my-2"}>Propriété Intellectuelle</h3>

                <p>Le contenu de ce site web (textes, images, vidéos, etc.) est la propriété
                    exclusive {"d'Amiens"} Food.
                    Toute reproduction ou représentation totale ou partielle de ce site ou de son contenu, par quelque
                    procédé que ce soit, sans {"l'autorisation"} expresse {"d'Amiens"} Food est interdite et
                    constituerait une
                    contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>Données Personnelles</h3>

                <p>Les informations collectées à travers ce site sont destinées à Amiens Food et ne seront utilisées que
                    dans le cadre de la relation commerciale établie avec les utilisateurs de ce site. Conformément à la
                    loi {"\"Informatique et Libertés\""} du 6 janvier 1978, vous disposez {"d'un droit d'accès"}, de
                    rectification
                    et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter à
                    {"l'adresse email"} contact@amiensfood.com.
                </p>
            </div>

            <div>
                <h3 className={"h4 my-2"}>Cookies</h3>

                <p>Ce site utilise des cookies pour améliorer {"l'expérience"} de navigation des utilisateurs. En continuant
                    à naviguer sur ce site, vous acceptez {"l'utilisation"} de cookies conformément à notre politique de
                    confidentialité.
                </p>
            </div>
        </div>
    )
}

export default LegalPage
