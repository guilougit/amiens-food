import {Resend} from "resend";
import {User} from "@prisma/client";

export const sendCardByEmail = async (path: string, mail: string, appleWalletLink?: string, androidWalletLink?: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    console.log(path, mail)
    
    const res = await resend.emails.send({
        from: 'Amiens food <noreply@amiensfood.com>',
        to: mail,
        subject: 'Voici ta carte Amiens food',
        html: `
            <div style="display:flex;align-items: center;">
                <img src="https://amiensfood.com/img/logo/Logo.png" width="100" />
                
                <p style="font-weight: bold">Amiens Food</p>
            </div>
            <hr/>
            
            <div style="margin: 30px">       
                <h2>Récupère ta carte en food en pièce jointe</h2>
                
                <p>Tu peux aussi te connecter à ton compte pour accéder à tes informations et aussi à ta carte !</p>
                
                <a href="https://amiensfood.com/compte" style="background-color: #FA8419; text-decoration: none; padding: 8px 20px;color:white;border-radius: 10px;font-size:18px;margin: 0 auto;display: block;width: max-content">Mon compte</a>
                
                
                <p style="margin-top: 60px">Tu peux aussi ajouter ta carte sur le wallet de ton téléphone ! </p>
                
                <!--
                <div style="display: flex; justify-content: center;gap: 15px;margin-top: 30px;">
                    <a href="${appleWalletLink}">
                        <img src="https://cdsassets.apple.com/live/7WUAS350/images/ios/locale/fr-fr/add-to-apple-wallet-logo.png" width="100">               
                    </a>
                    <a href="${androidWalletLink}">
                        <img src="https://amiensfood.com/img/add_to_google_wallet.png" width="150">               
                    </a>
                </div>
                -->
                
                <p style="color: gray; font-style: italic;text-align: center;margin-top: 20px;">
                    Si tu as un problème avec ta carte ou ton compte, contacte nous via notre site <a href="https://amiensfood.com/contact">en cliquant ici</a>
                    ou via notre adresse mail contact@amiensfood.com
                </p>
                
                <hr style="margin-top: 50px;"/>
                <p >Amiens Food</p>
            </div>  
            `,
        attachments: [{filename: 'amiens_food.png', path: path}],
    })
    
    console.log(res)
    
    return res
}