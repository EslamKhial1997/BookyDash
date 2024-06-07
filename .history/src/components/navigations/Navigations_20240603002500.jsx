import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

import Login from "../modules/auth/Login";
import Header from "../modules/header/Categories";
import Content from "../modules/contents/Contents";

const Profile = lazy(() => import("../modules/profile/Profile"));
const PersonalInfoTab = lazy(() => import("../modules/profile/tabs/PersonalInfoTab"));
const ChangePasswordTab = lazy(() => import("../modules/profile/tabs/ChangePasswordTab"));
const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Categories = lazy(() => import("../modules/categories/Categories"));
const Challenges = lazy(() => import("../modules/challenges/Challenges"));

const Navigations = () => {

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
      //  element={<ProtectedRoutes />}
       >
        <Route path="profile" element={<Profile />}>
          <Route path="" element={<PersonalInfoTab />} />
          <Route path="change_password" element={<ChangePasswordTab />} />
        </Route>
        <Route path="" element={<Dashboard />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Content />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="challenges/:id" element={<Header />} />
        <Route path="contents:/id" element={<Content />} />
        <Route path="*" element={<h1>page not found</h1>} />
      </Route>
    </Routes>
  )
}

export default Navigations