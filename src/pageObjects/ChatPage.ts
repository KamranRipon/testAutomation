import {TestConstants} from '../utils/TestConstants';
import {BasePage} from './BasePage';

/**
 * A
 */
export class ChatPage extends BasePage {
    chatField: string = '[aria-label="Hier chatten"]';
    chatMsgPattern: string = '#chat-message-';

    /**
     * Navigate to our chatbot
     */
    async navigate() {
      await this.page.goto(
          TestConstants.baseUrl,
          {waitUntil: 'domcontentloaded'},
      );
      await this.page.waitForTimeout(2000);
    }

    /**
     * Method to click the installation link
     */
    async clickChat() {
      await this.page.click(this.chatField);
    }

    /**
     * Method to type a text while the chat field is selected
     * @param {string} msg text to send
     */
    async writeMessage(msg: string) {
      await this.clickChat();
      await this.page.fill(this.chatField, msg);
      await this.page.waitForTimeout(2000);
      await this.page.press(this.chatField, 'Enter');
    }

    /**
     * Get the inner text of a chat-message-id
     * @param {number} id Id of the chat-message. The id has to correspond
     * to the id in the html dom
     */
    async getTextOfChatMsg(id: number) {
      await this.page
          .waitForSelector(`${this.chatMsgPattern}${id}`);
      const element = await this.page.innerText(`${this.chatMsgPattern}${id}`,
          {timeout: 10000});
      return element;
    }
}
