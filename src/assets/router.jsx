import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";
import Inicio from "../views/Inicio";
import Login from "../views/Login";
import Registro from "../views/Registro";
import AdminLayout from "../layouts/AdminLayout";
import Ordenes from "../views/Ordenes";
import Productos from "../views/Productos";

const router = createBrowserRouter([

  //Seccion de usuario 
  {
    path: "/",

    element: <Layout />,

    children: [
      {
        index: true, //Con true o false activa o desactiva la ruta
        element: <Inicio />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,

    children: [
      {
        path: "/auth/login", //Aqui se mantiene la ruta /auth/login
        element: <Login />,
      },
      {
        path: "/auth/registro", //Aqui se mantiene la ruta /auth/login
        element: <Registro />,
      },
    ],
  },

  //Seccion de administrador
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true, //Con true o false activa o desactiva la ruta
        element: <Ordenes />,
      },
      {
        path: "/admin/productos",
        element: <Productos />,
      },
    ],
  },
]);

export default router;
