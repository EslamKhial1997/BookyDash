import { configureStore } from '@reduxjs/toolkit';

import sidebarSlice from './sidebar/sidebarSlice';

import authSlice from './auth/authSlice';
import categoriesSlice from "./categories/categoriesSlice";
import challengesSlice from "./challenges/challengesSlice";
import headerSlice from './header/headerSlice';
import contentSlice from './content/contentSlice';

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth: authSlice,
    categories: categoriesSlice,
    challenges: challengesSlice,
    content: contentSlice,
    headers: headerSlice
  },
});