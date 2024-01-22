import React from 'react'
import appwriteServices from '../appwrite/config' // geting Service class
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) { //'$id' is syntax of appwrite
    console.log({ $id, title, featuredImage }); // 'featuredImage' ye spelling hona hi chahiye kyunki isko appwrite use krta hai
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={appwriteServices.getFilePreview(featuredImage)}
                        alt={title}
                        className='rounded-xl'
                    />
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard