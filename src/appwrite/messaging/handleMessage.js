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
        console.log('message created');
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
        console.log(response);
      }
    );
    console.log("Subscribed to messages collection");
  }
}

const messageService = new HandleMessage();
export default messageService;
