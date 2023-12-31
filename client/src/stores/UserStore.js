import { makeAutoObservable } from 'mobx';
import {
  addAvatarAPI,
  addInCartAPI,
  checkTokenAPI,
  confirmMailAPI,
  firstStepGoogleAuthAPI,
  getAvatarAPI, getCountOfMessagesAPI, getItemsAPI,
  getOneAPI,
  loginAPI,
  registerAPI
} from '../utils/http/userAPI';
import jwtDecode from 'jwt-decode';

// bad decomposition, refactor later (god's object)
class UserStore {
  constructor() {
    this._user = {};
    this._users = [];
    this._isAuth = false;
    this._path = null;
    this._items = [];

    makeAutoObservable(this);
  }

  setUser(user) {
    this._user = user;
  }

  setUsers(user) {
    this._users = [...this._users, user];
  }

  setPath(path) {
    this._path = path;
  }

  setIsAuth(boolean) {
    this._isAuth = boolean;
  }

  setItem(item) {
    this._items = [...this._items, item];
  }

  async register(registerData) {
    try {
      const data = await registerAPI(registerData);

      this.setUser(data);
      this.setIsAuth(true);
      this.setUsers(data);
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async confirmMail(confirmData) {
    try {
      await confirmMailAPI(confirmData);
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async login(loginData) {
    try {
      const data = await loginAPI(loginData);

      this.setUser(data);
      this.setIsAuth(true);
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async checkToken() {
    try {
      const data = await checkTokenAPI();

      this.setUser(data);
      this.setIsAuth(true);
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async addInCart(count, id) {
    try {
      await addInCartAPI(count, id);
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async getOne(id) {
    try {
      const data = await getOneAPI(id);

      return data;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async addAvatar(formData) {
    try {
      const { pathAvatar, message } = await addAvatarAPI(formData);

      this.setPath(pathAvatar.path);

      return message;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async getAvatar() {
    try {
      const data = await getAvatarAPI();

      this.setPath(data);

      return data;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  async firstStepGoogleAuth() {
    try {
      const userFormUrl = await firstStepGoogleAuthAPI();

      return userFormUrl;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  secondStepGoogleAuth(token) {
    const user = jwtDecode(token);

    this.setIsAuth(true);
    this.setUser(user);
    this.setUsers(user);
  }

  async getItems() {
    try {
      const items = await getItemsAPI();

      this._items = items;
    } catch (err) {}
  }

  async getCountOfMessages() {
    try {
      const countMessages = await getCountOfMessagesAPI();

      return countMessages;
    } catch (err) {
      throw { e: err.response.data.message };
    }
  }

  logout() {
    this.setUser({});
    this._users = [];
    this.setIsAuth(false);
    this.setPath(null);
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get path() {
    return this._path;
  }

  get users() {
    return this._users;
  }

  get items() {
    return this._items;
  }
}

export {
  UserStore,
};
