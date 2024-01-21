import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteServices from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState('Loading...')
    useEffect(() => {
        // if user is signed in then geting the post and saving it in state.
        appwriteServices.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents) //post.documents is a array of objects `{title: 'first', content: '', featuredImage: '65748dfd7659da02f14f', userId: '657455c5656b1592c70e', status: 'active', …}`
            }
            else{
                setLoading('Signup/Login to see blogs...')
            }
        })
    }, [])
    if (posts?.length === 0) {
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
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-64'>
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