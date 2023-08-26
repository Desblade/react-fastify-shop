import { makeAutoObservable } from 'mobx';
import { addGroceierAPI, deleteGroceierAPI, updateGroceierAPI } from '../utils/http/adminAPI';
import { getGroceiresAPI } from '../utils/http/userAPI';

// bad decomposition, refactor later (another god's object)
class AdminStore {
  constructor() {
    this._groceires = [];

    makeAutoObservable(this);
  }

  async addGroceier(groceierData) {
    try {
      const message = await addGroceierAPI(groceierData);

      return message;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async updateGroceier(formData, id) {
    try {
      const message = await updateGroceierAPI(formData, id);

      return message;
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

  async deleteGroceier(id) {
    try {
      const message = await deleteGroceierAPI(id);

      return message;
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
