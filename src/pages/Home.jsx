import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteServices from '../appwrite/config'

function Home() {
    console.log('hello guys');
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState('Loading...')
    useEffect(() => {
        console.log('called outside');
        appwriteServices.getPosts().then((posts) => {
            console.log('called');
            if (posts) {
                console.log('from home');
                console.log(posts);
                console.log(posts.documents);
                setPosts(posts.documents) //post.documents is a array of objects `{title: 'first', content: '', featuredImage: '65748dfd7659da02f14f', userId: '657455c5656b1592c70e', status: 'active', …}`
            }
            else{
                setLoading('Signup/Login to see blogs...')
            }
        })
    }, [])
    if (posts?.length === 0) {
        console.log('length=0 called');
        console.log(posts.length);
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {loading}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    // else if (posts === null) {
    //     console.log('null post');
    //     console.log(posts.length);
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Loading...
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    else {
        console.log('else called');
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }

}

export default Home