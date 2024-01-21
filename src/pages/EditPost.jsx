import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteServices from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPost() {
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    // getting user data.
    const userData = useSelector((state) => state.user);

    useEffect(()=>{
        if (slug) {
            appwriteServices.getPost(slug).then((post)=>{
                if(post && (userData ? post.userId === userData.$id : false)){ //fixed security flaw.
                    setPost(post)
                }
                else navigate('/')
            })
        }
        else{
            navigate('/')
        }
    },[])

  return (post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null)
}

export default EditPost