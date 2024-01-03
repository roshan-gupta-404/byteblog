import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {
    console.log('hello from postform');
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user)

    const submit = async (data) => {
        console.log('submit called');
        if (post) {
            const file = await (data.image[0] ? appwriteService.uploadFile(data.image[0]) : null) //data.image[0] will give image. React hook form provide this functionality.
            console.log('image uploaded');
            console.log(file);
            if (file) {
               await appwriteService.deleteFile(post.featuredImage)
                console.log('image deleted');
            }
            const dbPost = await appwriteService.updatPost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            console.log('post updated');
            if (dbPost) {
                console.log(dbPost);
                navigate(`/post/${dbPost.$id}`)     // agar ./post/dbpost.id denge to wo current page ke ander post/dbpost.id dhundhega.
            }
        }
        else {
            const file = await appwriteService.uploadFile(data.image[0]); 
            // console.log('else section');
            // console.log(file);
            // console.log('image uploaded');
            if (file) {
                // console.log(file);
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.
                    createPost({
                        ...data,
                        userId: userData.$id,
                    })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase()
                .replace(/^[a-zA-Z\d\s] + /g, '-')  // giving regex values.
                .replace(/\s/g, '-')                 // giving regex values.
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {         // storing watch() in subscription to optimize
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full hover:border-2">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm