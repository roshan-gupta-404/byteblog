import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name); // this will return an object containing information about the user account, such as the user ID, email, name, and any other relevant details.
            if (userAccount) {
                //call another method.
                return this.login({ email, password }) // if account created the loging in the user.
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password); // this will return the session ID, user ID, and other relevant details.
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            console.log('getuser called');
            return await this.account.get(); // this will return current user session.
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null; // if failed to get user return null.
    }

    async logout(){
        try {
            // await this.account.deleteSession('current'); // to logout from current or single session only.
            await this.account.deleteSessions(); // this will delete all sessions.
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
// all async function is treated as promise and should be handled with then catch.

const authService = new AuthService()

export default authService
