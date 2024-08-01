export interface TextCustom {
    id: string,
    code: "LANDING_HERO_TITLE"
        | "LANDING_HERO_SUBTITLE"
        | 'LANDING_BLOC_1_TITLE'
        | 'LANDING_BLOC_1_CONTENT'
        | 'LANDING_BLOC_2_TITLE'
        | 'LANDING_BLOC_2_CONTENT'
        | 'LANDING_BLOC_3_TITLE'
        | 'LANDING_BLOC_3_CONTENT'
        | 'PARTNER_LIST_TITLE'
        | 'PARTNER_LIST_SUBTITLE'
        | 'PARTNER_OFFERS_DETAIL_TITLE'
        | 'CONTACT_TITLE'
        | 'CONTACT_FORM_TITLE'
        | 'PAYMENT_TITLE'
        | 'PAYMENT_SUBTITLE'
        | 'PAYMENT_SUBTITLE_2'
        | 'PAYMENT_PRICE_SUBTITLE'
        | 'PAYMENT_FORM_INF'
        | 'PAYMENT_FORM_PREVIEW'
        | 'ABOUT_PAGE'

    text: string
}

export interface ComCustomerExample {
    from: string,
    to: string,
    name: string,
    description: string,
    logo: string,
    mockup: any,
    reversed?: boolean
}
