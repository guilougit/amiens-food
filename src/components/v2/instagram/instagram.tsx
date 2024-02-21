export default async function InstagramPosts() {
    const instagramFetch = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`).then(res => res.json())
    
    return (
        <main>   
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mt-10 px-4 sm:px-6 gap-3">
                
                    {instagramFetch.data.map((post:any, index:any) => (
                        <div key={index} data-aos="fade-up">
                            <img className="object-cover aspect-square transform hover:scale-105 transition duration-700 ease-out" src={post.media_url} alt={post.caption} />
                            <h2 className="text-gray-900 mt-2 text-sm font-semibold">{post.caption}</h2>
                        </div>
                    ))}
            </div>                   
        </main>        
    )
}