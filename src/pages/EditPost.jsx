import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteServices from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if (slug) {
            appwriteServices.getPost(slug).then((post)=>{
                console.log('from editpost');
                if(post){
                    console.log(post);
                    setPost(post)
                }
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