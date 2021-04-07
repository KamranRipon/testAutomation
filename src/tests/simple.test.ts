/* eslint-disable max-len */
import {ChatPage} from '../pageObjects/ChatPage';
import {TestConstants} from '../utils/TestConstants';

describe(TestConstants.browser, () => {
  describe('Does the chatbot respond correctly to a hello?', () =>{
    // const chatPage = new ChatPage(page);
    it('When I open the chatUi then the chatbot starts greeting me', async () => {
      const chatPage = new ChatPage(page);
      await chatPage.navigate();

      const initialMsg = await chatPage.getTextOfChatMsg(0);
      console.log(initialMsg);
      expect(initialMsg)
          .toContain('Moin, ich bin dChatbot2. Ich bin der Beispielbot von Dataport. ');
    });

    it('And the chatbot can tell me what kind of weather we have in Bremen', async () => {
      const chatPage = new ChatPage(page);
      await chatPage.navigate();
      await chatPage.writeMessage('wie ist das wetter in bremen');
      const latestRespond = await chatPage.getTextOfChatMsg(2);
      expect(latestRespond)
          .toContain('Das Wetter in Bremen ist');
    });
  });
});

