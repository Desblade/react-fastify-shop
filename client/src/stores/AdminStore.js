import { makeAutoObservable } from 'mobx';
import { addGroceierAPI, getChatsAPI } from '../utils/http/adminAPI';
import { getGroceiresAPI } from '../utils/http/userAPI';

// bad decomposition, refactor later (another god's object)
class AdminStore {
  constructor() {
    this._groceires = [];

    makeAutoObservable(this);
  }

  setGroceier(groceier) {
    this._groceires = [...this._groceires, groceier];
  }

  async addGroceier(groceierData) {
    try {
      const data = await addGroceierAPI(groceierData);
      this.setGroceier(data.groceier);

      return data.message;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async getGroceires() {
    try {
      this._groceires = await getGroceiresAPI();
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  get groceiers() {
    return this._groceires;
  }
}

export {
  AdminStore,
};
