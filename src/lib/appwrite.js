import { Client, Account, Databases } from "appwrite";
import {endPoint, projId, mainDatabaseId, usersCollectionId} from '../constants/dev'
const client = new Client();
client
    .setEndpoint(endPoint)
    .setProject(projId);



const account = new Account(client);
const db = new Databases(client);
const mainDatabase = mainDatabaseId;
const usersCollection = usersCollectionId;

export { account, db, mainDatabase, usersCollection }


