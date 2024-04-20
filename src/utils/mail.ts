import {Resend} from "resend";

export const sendCardByEmail = async (path: string, mail: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    console.log(path, mail)
    
    const res = await resend.emails.send({
        from: 'Amiens food <noreply@amiensfood.com>',
        to: mail,
        subject: 'Voici ta carte Amiens food',
        html: "<h1>Voici votre carte Amiens Food</h1>",
        attachments: [{filename: 'amiens_food.png', path: path}],
    })
    
    console.log(res)
    
    return res
}