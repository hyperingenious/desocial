
const conf = {
  appwriteId: import.meta.env.VITE_APPWRITE_ID,
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  userCollectionId: import.meta.env.VITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_POST_COLLECTION_ID,
  likesCollectionId: import.meta.env.VITE_LIKES_COLLECTION_ID,
  messagesCollectionId: import.meta.env.VITE_MESSAGES_COLLECTION_ID,
  primaryBucketId: import.meta.env.VITE_PRIMARY_BUCKET_ID,
};

export default conf;