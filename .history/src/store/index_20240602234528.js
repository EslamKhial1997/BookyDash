import { configureStore } from '@reduxjs/toolkit';

import sidebarSlice from './sidebar/sidebarSlice';

import authSlice from './auth/authSlice';
import categoriesSlice from "./categories/categoriesSlice";
import challengesSlice from "./challenges/challengesSlice";
import settingsSlice from "./content/contentSlice";
import headerSlice from './header/headerSlice';

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth: authSlice,
    categories: categoriesSlice,
    challenges: challengesSlice,
    contents: settingsSlice,
    headers: headerSlice
  },
});