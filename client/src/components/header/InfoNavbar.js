import Home from "../../pages/Home";
import Introduce from "../../pages/Introduce";
import Products from "../../pages/Products";
import Information from "../../pages/Information";
import Contact from "../../pages/Contact";

export const infoNavbar = [
  {
    id: 1,
    path: "/",
    name: "Home",
    main: <Home />,
  },
  {
    id: 2,
    path: "introduce",
    name: "Introduce",
    main: <Introduce />,
  },
  {
    id: 3,
    path: "products",
    name: "Products",
    category: "Products",
    main: <Products />,
  },
  {
    id: 4,
    path: "information",
    name: "Information",
    main: <Information />,
  },
  {
    id: 5,
    path: "contact",
    name: "Contact",
    main: <Contact />,
  },
];
