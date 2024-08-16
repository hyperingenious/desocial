import { ID } from "appwrite";
import { databases, storage } from "../appwrite";

export async function creatPost({ image, postText, userId }) {
  try {
    let imageId;
    if (image) {
      const imageData = await uploadImage(image);
      imageId = imageData.$id;
    }

    await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_POST_COLLECTION_ID,
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
  console.log(image);
  try {
    const data = await storage.createFile(
      import.meta.env.VITE_PRIMARY_BUCKET_ID,
      ID.unique(),
      image
    );

    return data;
  } catch (error) {
    throw error;
  }
}
