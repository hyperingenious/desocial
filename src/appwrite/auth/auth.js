import { ID } from "appwrite";
import { account, databases } from "../appwrite";

export async function signUp({
  email,
  password,
  name,
  course,
  semester,
  navigate,
  setUserId,
}) {
  try {
    const { $id } = await account.create(ID.unique(), email, password);

    const db = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_COLLECTION_ID,
      $id,
      {
        name,
        course,
        semester,
      }
    );

    setUserId($id)

    navigate("/feed");
  } catch (e) {
    console.error(e);
    throw error;
  }
}

export async function login({ email, password, navigate ,setUserId}) {
  try {
    const {$id} = await account.createEmailPasswordSession(email, password);
    setUserId($id)

    navigate("/feed");
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(navigate, setUserId) {
  try {
    const { $id } = await account.get();
    setUserId($id);
    navigate("/feed");
  } catch (err) {
    navigate("/authenticate");
    console.error(err);
    throw err;
  }
}

/*
export async function getUser(navigate) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    navigate("/authenticate");
    throw new Error("Failed to get the session!");
  }
  return null;
}
*/
