

import Link from "next/link";
import Image from "next/image";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {MoveLeft} from "lucide-react";

const allPosts = [
    {
        title: "Titre de l'article 1",
        slug: "titre-de-larticle-1",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },
    {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-2",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },    {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-3",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-4",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-5",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-6",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-7",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-8",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-9",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-10",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },   {
        title: "Titre de l'article 2",
        slug: "titre-de-larticle-11",
        image: "https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg",
        createdAt: "2023-02-12"
    },
]


export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: {
    params: { slug: string }
}): Promise<Metadata | undefined> {

    const post = allPosts.find((post) => post.slug === params.slug)

    if (!post) return

    const { title} = post

    return {title: `Amiens Food - ${title}`}
}

const PostDetail = ({params}:{params:{slug: string}}) => {
    const post = allPosts.find((post) => post.slug === params.slug)

    if (!post) notFound()
    
    return (
        <section className="relative pt-28 md:pt-36">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                    <div className="max-w-3xl mx-auto">

                        <article>

                            <header className="mb-8">
                                {/* Title and excerpt */}
                                <div className="text-center md:text-left">
                                    <h1 className="h1 mb-4" data-aos="fade-up">Titre de l'article</h1>
                                </div>
                                {/* Article meta */}
                                <div className="md:flex md:items-center md:justify-between mt-3">
                                    {/* Author meta */}
                                    <div className="flex items-center justify-center" data-aos="fade-up"
                                         data-aos-delay="200">
                                        <div>
                                            <Link href="#"
                                                  className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">Amiens
                                                food</Link>
                                            <span className="text-gray-700"> - </span>
                                            <span className="text-gray-500">10/02/2024</span>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Article image */}
                            {post.image &&
                                <figure className="mb-8 lg:-ml-32 lg:-mr-32" data-aos="fade-up" data-aos-delay="200">
                                    <Image className="w-5/6 mx-auto rounded-2xl" src={post.image} width={1024}
                                           height={576}
                                           alt={post.title} priority/>
                                </figure>
                            }

                            {/* Article content */}
                            <p>contenu</p>


                        </article>

                    </div>
                </div>
                <Link href={"/actualites"} className={"flex gap-2 mb-6"} >
                    <MoveLeft/>
                    Tous les articles
                </Link>
            </div>
        </section>
    )
}

export default PostDetail