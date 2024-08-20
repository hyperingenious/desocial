import { ID } from "appwrite";
import appwriteService, { AppwriteService } from "../appwrite";
import conf from "../../helpers/conf";

export async function creatPost({ image, postText, userId }) {
  try {
    let imageId;
    if (image) {
      const imageData = await uploadImage(image);
      imageId = imageData.$id;
    }

    await appwriteService.databases.createDocument(
      conf.databaseId,      
      conf.postCollectionId,
      ID.unique(),
      {
        user: userId,
        post_text: postText,
        ...(image && {
          image_url: `https://cloud.appwrite.io/v1/storage/buckets/66be6a410005c2d0b001/files/${imageId}/view?project=6572f5a9d22d854a74a0&mode=admin`,
        }),
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function uploadImage(image) {
   try {
    const data = await appwriteService.storage.createFile(
      conf.primaryBucketId,
      ID.unique(),
      image
    );

    return data;
  } catch (error) {
    throw error;
  }
}
