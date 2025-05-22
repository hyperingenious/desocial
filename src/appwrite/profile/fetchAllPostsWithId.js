import { Query } from "appwrite";
import conf from "../../helpers/conf";
import appwriteService from "../appwrite";

export async function fetchAllPostsWithId(userId) {
  try {
    const data = await appwriteService.databases.listDocuments(
      conf.databaseId,
      conf.postCollectionId,
      [Query.equal("user", [userId])]
    );
    const refiedData = { ...data, documents: data.documents.reverse() };
    return refiedData;
  } catch (error) {
    throw error;
  }
}
