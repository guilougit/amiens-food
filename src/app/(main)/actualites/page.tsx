import Link from "next/link";
import Image from "next/image";
import PostListPagination from "@/src/components/v2/blog/post-list-pagination";
import InstaPosts from "@/src/components/v2/instagram/instagram";
import type {Metadata} from "next";
import {Instagram, Mail} from "lucide-react";

export const metadata: Metadata = {
    title: 'Amiens food - Blog',
    description: 'Retrouvez nos dernières actualités Amiens Food sur notre blog',
}

const BlogPage = () => {
    return (
        <>
            {/* HERO BANNER */}
            <section className="relative">
                {/* Bg */}
                <div
                    className="absolute inset-0 rounded-bl-[100px] mb-12 md:mb-0 bg-gradient-to-r from-[#FB943C] via-[#FBBF26] to-[#FB943C] pointer-events-none -z-10"
                    aria-hidden="true"
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6" >
                    <div className="pt-24 md:pt-40 pb-16">
                        {/* Hero content */}
                        <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
                            {/* Content */}
                            <h1 className="text-4xl sm:text-6xl font-bold text-slate-800 mb-6 leading-[1.6] sm:leading-[1.2] text-center"
                            >
                                Nos dernières actualités
                            </h1>
                        </div>
                    </div>
                </div>

            </section>

            <div className={"grid grid-cols-1 lg:grid-cols-2 mx-6 mt-8 gap-24"} data-aos={"fade-up"}>
                <div>
                    {/*  Page header */}
                    <div className="max-w-3xl pb-8 text-center md:text-left">
                        <h1 className="h3">Notre compte instagram</h1>

                        <div className={"flex justify-center mt-6 gap-3"}>

                            <Link href={"https://www.instagram.com/amiensfood"} target={"_blank"}
                                  className={"flex gap-3 border px-3 py-2 rounded-lg cursor-pointer"}><Instagram/> @amiensfood</Link>
                        </div>

                    </div>

                    <div>
                        <InstaPosts/>
                    </div>
                </div>
                <section className="relative">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pb-12 md:pb-20">

                            {/*  Page header */}
                            <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
                                <h1 className="h3" data-aos="fade-up">Blog</h1>
                            </div>

                            {/*  Featured article */}
                            <div className="pb-12 md:pb-20">
                                <article
                                    className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                                    <Link href={`/blog/1`} className="relative block group" data-aos="fade-right"
                                          data-aos-delay="200">
                                        <div
                                            className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                                            aria-hidden="true"></div>
                                        <figure
                                            className="relative pb-9/16 md:pb-3/4 lg:pb-9/16 overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out h-[300px]">
                                            <Image
                                                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                                                src={"https://randomwordgenerator.com/img/picture-generator/54e6dc464856af14f1dc8460962e33791c3ad6e04e50744172277ed79044cd_640.jpg"}
                                                width="540" height="303"
                                                alt={"titre post"}/>
                                        </figure>
                                    </Link>
                                    <div data-aos="fade-left" data-aos-delay="200">
                                        <header>
                                            <h3 className="h3 text-2xl lg:text-3xl mb-1">
                                                <Link href={`/blog/1`}
                                                      className="hover:text-gray-100 transition duration-150 ease-in-out">Titre
                                                    du post</Link>
                                            </h3>
                                        </header>
                                        <p className="text-lg text-gray-400 grow">Sommaire</p>
                                        <footer className="flex items-center mt-2">
                                            <div>
                                                <Link href="#"
                                                      className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">Amiens
                                                    food</Link>
                                                <span className="text-gray-700"> - </span>
                                                <span className="text-gray-500">12/08/2023</span>
                                            </div>
                                        </footer>
                                    </div>
                                </article>
                            </div>

                            {/*  Articles list */}
                            <div className="max-w-sm mx-auto md:max-w-none">

                                {/*  Section title */}
                                <h4 className="h4 pb-6 mb-10 border-b border-gray-700" data-aos="fade-up">Articles
                                    récents</h4>

                                {/*  Articles container */}
                                <PostListPagination/>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BlogPage