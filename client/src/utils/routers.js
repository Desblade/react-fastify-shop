import {
  ADMIN_PAGE,
  CART_PAGE,
  CHAT_PAGE,
  CHAT_PAGE_ADMIN,
  ITEM_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  PROFILE_PAGE,
  REGISTER_PAGE
} from './consts';
import { AdminPage } from '../pages/AdminPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ItemPage } from '../pages/ItemPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ChatPageAdmin } from '../pages/ChatPageAdmin';
import { ChatPage } from '../pages/ChatPage';

export const adminRouters = [
  {
    path: ADMIN_PAGE,
    Component: AdminPage,
  },
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
  {
    path: CART_PAGE,
    Component: CartPage,
  },
  {
    path: ITEM_PAGE,
    Component: ItemPage,
  },
  {
    path: PROFILE_PAGE,
    Component: ProfilePage,
  },
  {
    path: CHAT_PAGE_ADMIN,
    Component: ChatPageAdmin,
  },
];

export const authRouters = [
  {
    path: CART_PAGE,
    Component: CartPage,
  },
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
  {
    path: ITEM_PAGE,
    Component: ItemPage,
  },
  {
    path: PROFILE_PAGE,
    Component: ProfilePage,
  },
  {
    path: CHAT_PAGE,
    Component: ChatPage,
  },
];

export const publicRouters = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
  {
    path: REGISTER_PAGE,
    Component: RegisterPage,
  },
  {
    path: LOGIN_PAGE,
    Component: LoginPage,
  },
  {
    path: ITEM_PAGE,
    Component: ItemPage,
  },
];