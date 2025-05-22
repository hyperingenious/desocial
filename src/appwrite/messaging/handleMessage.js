import { ID } from "appwrite";
import conf from "../../helpers/conf";
import { AppwriteService } from "../appwrite";

export class HandleMessage extends AppwriteService {
  constructor() {
    super();
  }
    
  async createMessage(message) {
    try {
      const response = await this.databases.createDocument(
        conf.databaseId,
        conf.messagesCollectionId,
        ID.unique(),
        {
          test: message,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async handleMessage() {
    this.client.subscribe(
      [
        `databases.${conf.databaseId}.collections.${conf.messagesCollectionId}.documents`,
      ],
      (response) => {
        // Log when a new file is uploaded
      }
    );
  }
}

const messageService = new HandleMessage();
export default messageService;
