import ChatPage from '../pageObjects/ChatPage';
/* eslint-disable new-cap */
Feature('Simple Chat');

Scenario('Ask for the weather in Bremen', ({I}) => {
  I.amOnPage('');
  I.waitForElement('#chat-message-0', 5);
  I.fillField(ChatPage.chatField, 'wie ist das Wetter in bremen');
  I.pressKey('Enter');
  I.see('Das Wetter in Bremen ist ', '#chat-message-2');
});
