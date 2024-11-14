import Signup from "../../pages/signup";
import Login from "../../pages/login";
import Home from "../../pages/home";
import { signup, login, home, details } from "../pathName";
import Details from "../../pages/details";

const authRoutes = [
  {
    title: "signup",
    component: Signup,
    path: signup,
  },
  {
    title: "login",
    component: Login,
    path: login,
  },
];

export default authRoutes;
