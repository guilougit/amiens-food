"use client"

import {useState} from "react";
import {PostItem} from "@/src/components/v2/blog/post-item";
import {Button} from "@/src/components/ui/button";

export const posts = [
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

const PostListPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    return (
        <>
            <div className="grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
                {currentPosts.map(post => (
                    <PostItem {...post} key={post.slug}/>
                ))}
            </div>

            {posts.length > postsPerPage && (
                <div className={"space-x-2 mt-8 space-y-2"}>
                    <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={"rounded-xl"}
                        variant={"secondary"}
                    >
                        Précédent
                    </Button>
                    {Array.from({length: Math.ceil(posts.length / postsPerPage)}, (_, index) => (
                        <Button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`rounded-full`}
                            variant={currentPage === index + 1 ? 'default' : 'outline'}
                            size={"icon"}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                        className={"rounded-xl"}
                        variant={"secondary"}
                    >
                        Suivant
                    </Button>
                </div>
            )}

        </>
    )
}

export default PostListPagination