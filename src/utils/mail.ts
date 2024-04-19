import {Resend} from "resend";

export const sendCardByEmail = async (path: string, mail: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
        from: 'Amiens food <noreply@amiensfood.com>',
        to: mail,
        subject: 'Voici ta carte Amiens food',
        html: "<h1>Voici votre carte Amiens Food</h1>",
        text: "Voici votre carte amiens Food",
        attachments: [{filename: 'amiens_food.png', path}]
    })
}