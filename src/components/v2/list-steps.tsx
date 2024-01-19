import ShopIcon from "@/public/img/icons/panier.png"
import RestaurantIcon from "@/public/img/icons/restaurant.png"
import Image from "next/image";

export const ListSteps = () => {
    return (
        <>
            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="py-12 md:py-16 md:pb-20">
                        {/* Items */}
                        <div className="max-w-sm mx-auto grid gap-12 md:grid-cols-3 md:-mx-9 md:gap-0 items-start md:max-w-none">
                            {/* 1st item */}
                            <div
                                className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden"
                                data-aos="fade-up"
                            >
                                <div className="mb-3">
                                    <Image src={ShopIcon} alt={''} className={"w-[50px]"} />
                                </div>
                                <h4 className="text-xl font-bold mb-1">Achète ta carte</h4>
                                <p className="text-slate-500">
                                    Créer ton compte et achète la carte sur une plateforme fiable et sécurisée pour la recevoir directement par mail.
                                </p>
                            </div>

                            {/* 2nd item */}
                            <div
                                className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className="mb-3">
                                    <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                                        <g fillRule="nonzero" fill="none">
                                            <path
                                                d="m19.93 36.705-9.769-20.03c-.208-.426.026-.966.523-1.209L39.446 1.438c.497-.242 1.066-.094 1.274.332l9.77 20.03c.207.427-.026.967-.523 1.21L21.205 37.036c-.497.243-1.067.094-1.274-.332Zm2.395-22.466-7.19 3.507.876 1.798 7.19-3.507-.876-1.798Z"
                                                fill="#FFD7AD"
                                            />
                                            <path
                                                d="M32 46V12h5.143c.474 0 .857.447.857 1v32c0 .553-.383 1-.857 1H32Zm-2 0H14.857c-.474 0-.857-.447-.857-1V13c0-.553.383-1 .857-1H30v34ZM18 34v8h2v-8h-2Z"
                                                fill="#FA953C"
                                                style={{ mixBlendMode: 'multiply' }}
                                                transform="rotate(64 19.372 32.782)"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-1">Enregistre ta carte</h4>
                                <p className="text-slate-500">
                                    Ajoute ta carte sur le wallet de ton téléphone, ou connecte toi pour la récupérer.
                                </p>
                            </div>

                            {/* 3rd item */}
                            <div
                                className="relative md:px-9 after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-slate-200 last:after:hidden"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <div className="mb-4">
                                    <Image src={RestaurantIcon} alt={''} className={"w-[50px]"} />
                                </div>
                                <h4 className="text-xl font-bold mb-1">Utilise ta carte</h4>
                                <p className="text-slate-500">
                                    Présente-la chez nos restaurants partenaires pour profiter des réductions instantanées.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
