import {Resend} from "resend";
import {NextResponse} from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const {name, email, content} = await request.json()
    
    const mail = await resend.emails.send({
        from: 'Amiens food <noreply@amiensfood.com>',
        to: 'remycastro27@icloud.com',
        subject: 'Nouveau message du formulaire de contact Amiens food',
        html: `<b>Nom : ${name}</b> <br> <b>Mail : </b>${email} <br> <b>Message : </b><br> ${content}`,
    })
    
    if(mail.error) return NextResponse.json({success: false, error: mail.error.name})
    
    return NextResponse.json({success: true})
}