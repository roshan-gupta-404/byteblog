// major appwrite configurations

import conf from "../conf/conf";
import { Client, Databases,Storage,Query, ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // POST RELATED SERVICES
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug, // i am using slug as unique id which createDocument demands
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatPost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug, // i am using slug as unique id which createDocument demands
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatPost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){ // status is key and active is value which is to be matched.
        try {
            return await this.databases.listDocuments(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                queries
                // we can pass other values like limits etc...
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // FILE UPLOAD SERVICES.
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        console.log(fileId);
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
    }
}

const service = new Service()
export default service // exporting instance of service.