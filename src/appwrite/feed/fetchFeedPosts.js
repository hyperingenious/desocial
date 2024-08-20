import appwriteService, { AppwriteService } from "../appwrite";
import conf from "../../helpers/conf";

export async function fetchFeedPosts() {
  try {
    const data = await appwriteService.databases.listDocuments(
      conf.databaseId,
      conf.postCollectionId,
      []
    );

    // async function checkIfLikedbyCurrentUser(document) {
    //   try {
    //     const likes = await appwriteService.databases.listDocuments(
    //       conf.databaseId,
    //       conf.likesCollectionId,
    //       Query.and([
    //         Query.equal("user", [userId]),
    //         Query.equal("post", [document.$id]),
    //       ])
    //     );
    //     return likes;
    //   } catch (error) {
    //     throw error;
    //   }
    // }

    // const dataWithLikes = data.documents.map(async (document) => {
    //   return checkIfLikedbyCurrentUser(document);
    // });

    // const finalData = await Promise.all(dataWithLikes);
    return data;
  } catch (error) {
    throw error;
  }
}
