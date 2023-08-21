import { makeAutoObservable } from 'mobx';
import { getChatsAPI } from '../utils/http/adminAPI';

class ChatStore {
  constructor() {
    this._chats = [];
    this._receivedMesages = [];

    makeAutoObservable(this);
  }

  async getChats() {
    try {
      const chats = await getChatsAPI();

      this._chats = chats;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  setChat(chat) {
    this._chats = [...this._chats, chat];
  }

  setReceivedMessage(receivedMessage) {
    this._receivedMesages = [...this._receivedMesages, receivedMessage];
  }

  setAllReceivedMessages(allReceivedMessages) {
    this._receivedMesages = allReceivedMessages;
  }

  get chats() {
    return this._chats;
  }

  get receivedMessages() {
    return this._receivedMesages;
  }
}

export {
  ChatStore,
};
