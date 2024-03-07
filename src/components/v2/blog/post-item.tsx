import Link from "next/link";
import Image from "next/image";

export const PostItem = ({ ...props }) => {
    return (
        <article className="flex flex-col h-full" data-aos="fade-up">
            <header>
                    <Link href={`/actualites/${props.slug}`} className="block mb-2">
                        <figure className="relative h-[200px] pb-9/16 overflow-hidden rounded-sm">
                            <Image
                                className="absolute inset-0 w-full h-[200px] object-cover transform hover:scale-105 transition duration-700 ease-out"
                                src={"https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg"} width={352} height={198} alt={props.title}/>
                        </figure>
                    </Link>
                <h3 className="h4 mb-1">
                    <Link href={`/actualites/${props.slug}`}
                          className="transition duration-150 ease-in-out">{props.title}</Link>
                </h3>
            </header>
            <footer className="flex items-center mt-2">
                <div className="font-medium">
                    <Link href="#"
                          className="transition duration-150 ease-in-out text-sm">Amiens food</Link>
                    <span className="text-gray-700 text-sm"> - </span>
                    <span className="text-gray-500 text-sm">13/02/2023</span>
                </div>
            </footer>
        </article>
    )
}