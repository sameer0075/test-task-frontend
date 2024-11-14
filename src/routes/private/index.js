import Details from "../../pages/details";
import Home from "../../pages/home";
import { details, home } from "../pathName";

const privateRoutes = [
  {
    title: "home",
    component: Home,
    path: home,
  },
  {
    title: "details",
    component: Details,
    path: details,
  },
];

export default privateRoutes;
