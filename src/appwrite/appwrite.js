import { Account, Client, Databases, Storage } from "appwrite";

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_ID); // Your project ID

export const databases = new Databases(client);

export const account = new Account(client);

export const storage = new Storage(client);