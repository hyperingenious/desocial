import { Account,ID } from "appwrite";
import conf from "../../helpers/conf";
import { AppwriteService } from "../appwrite";

class AuthService extends AppwriteService {
  account;

  constructor() {
    super();
    this.account = new Account(this.client);
  }

  async signUp({
    email,
    password,
    name,
    course,
    semester,
     setUserId,
  }) {
    try {
     const {$id}= await this.account.create(ID.unique(), email, password);
       await this.login({ email, password, setUserId });
      await this.createUserDocument({ name, course, semester , userId: $id });
     } catch (error) {
      throw error;
    }
  }

  async login({ email, password, setUserId }) {
    try {
      const data = await this.account.createEmailPasswordSession(
        email,
        password
      );
      setUserId(data.$id);

    } catch (error) {
      throw error;
    }
  }

  async getUser(navigate, setUserId, route) {
    try {
      const { $id } = await this.account.get();
      setUserId($id);
      navigate(route !== '/'? route : '/feed');
      // navigate("/feed");
    } catch (error) {
      navigate("/authenticate");
      throw error
    }
  }

  async createUserDocument({ name, course, semester, userId }) {
    try {
      await this.databases.createDocument(
        conf.databaseId,
        conf.userCollectionId,
        userId,
        {
          name,
          course,
          semester,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
