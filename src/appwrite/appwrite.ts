import { Client, Databases, Storage } from "appwrite";
import conf from "../helpers/conf";

export class AppwriteService {
  client;
  databases;
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteId); // Your project ID
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;