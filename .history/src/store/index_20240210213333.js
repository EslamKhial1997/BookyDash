import { configureStore } from '@reduxjs/toolkit';

import sidebarSlice from './sidebar/sidebarSlice';

import authSlice from './auth/authSlice';
import categoriesSlice from "./categories/categoriesSlice";
import challengesSlice from "./challenges/challengesSlice";
import settingsSlice from "./settings/settingsSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth: authSlice,
    categories: categoriesSlice,
    challenges: challengesSlice,
    settings: settingsSlice
  },
});