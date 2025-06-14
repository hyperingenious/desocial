import { ID } from "appwrite";
import appwriteService from "../appwrite";
import conf from "../../helpers/conf";
import type { FileWithPath } from "@mantine/dropzone";

interface CreatePost {
  image?: FileWithPath;
  postText: string;
  userId: string;
}

export async function creatPost({ image, postText, userId }: CreatePost) {
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
          image_url: `https://fra.cloud.appwrite.io/v1/storage/buckets/682e2351000c9be8390d/files/${imageId}/view?project=682e2145001a831543ad&mode=admin`,
        }),
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function uploadImage(image: FileWithPath) {
  const data = await appwriteService.storage.createFile(
    conf.primaryBucketId,
    ID.unique(),
    image
  );
  return data;
}
