import { Account, ID } from "appwrite";
import conf from "../../helpers/conf";
import { AppwriteService } from "../appwrite";

class AuthService extends AppwriteService {
  account;

  constructor() {
    super();
    this.account = new Account(this.client);
  }

  async signUp({ email, password, name, course, semester, setUserId }) {
    const { $id } = await this.account.create(ID.unique(), email, password);
    await this.login({ email, password, setUserId });
    await this.createUserDocument({ name, course, semester, userId: $id });
  }

  async login({ email, password, setUserId }) {
    const data = await this.account.createEmailPasswordSession(email, password);
    setUserId(data.$id);
  }

  async getUser(setUser, setIsAuthenticated) {
    const data = await this.account.get();
    setUser(data);
    setIsAuthenticated(true);
  }

  async createUserDocument({ name, course, semester, userId }) {
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
  }
}

const authService = new AuthService();
export default authService;
