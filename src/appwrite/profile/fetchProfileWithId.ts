import conf from "../../helpers/conf";
import appwriteService from "../appwrite";

export async function fetchProfileWithId(userId) {
  try {
    const data = await appwriteService.databases.getDocument(
      conf.databaseId,
      conf.userCollectionId,
      userId
    );
    return data;
  } catch (error) {
    throw error;
  }
}
