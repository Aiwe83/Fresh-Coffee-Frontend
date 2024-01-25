import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QuioscoProvider } from "./context/QuioscoProvider";
import router from "./assets/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  //<React.StrictMode>

    <QuioscoProvider>{/* Con esto va estar toda la informacion de forma global */}

      <RouterProvider router={router} />

    </QuioscoProvider>

  //</React.StrictMode>
);
