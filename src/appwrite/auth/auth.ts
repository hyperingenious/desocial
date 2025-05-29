import type { Models } from "appwrite";
import { Account, ID } from "appwrite";
import conf from "../../helpers/conf";
import { AppwriteService } from "../appwrite";

interface SignUp {
  email: string;
  password: string;
  name: string;
  course: string;
  semester: number;
  setUser: React.Dispatch<
    React.SetStateAction<
      Models.Session | Models.User<Models.Preferences> | null
    >
  >;
}

interface Login {
  email: string;
  password: string;
  setUser: React.Dispatch<
    React.SetStateAction<
      Models.Session | Models.User<Models.Preferences> | null
    >
  >;
}

interface CreateUserDocument {
  name: string;
  course: string;
  semester: number;
  userId: string;
}

class AuthService extends AppwriteService {
  account;

  constructor() {
    super();
    this.account = new Account(this.client);
  }
  async signUp({ email, password, name, course, semester, setUser }: SignUp) {
    const { $id } = await this.account.create(ID.unique(), email, password);
    await this.login({ email, password, setUser });
    await this.createUserDocument({ name, course, semester, userId: $id });
  }

  async login({ email, password, setUser }: Login) {
    const data = await this.account.createEmailPasswordSession(email, password);
    setUser(data);
  }

  async getUser(
    setUser: (
      session: Models.Session | Models.User<Models.Preferences>
    ) => void,
    setIsAuthenticated: (arg: boolean) => void
  ): Promise<void> {
    const data = await this.account.get();
    setUser(data);
    setIsAuthenticated(true);
  }

  async createUserDocument({
    name,
    course,
    semester,
    userId,
  }: CreateUserDocument): Promise<void> {
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
