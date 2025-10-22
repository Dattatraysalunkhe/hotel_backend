import { Client, Account, Storage} from "node-appwrite";
import { configDotenv } from 'dotenv'
configDotenv() // this for env access all ove

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID

const account = new Account(client);
const storage = new Storage(client)

export {account , storage}


