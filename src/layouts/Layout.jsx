import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//Definimos la funcion que se ejecutara cuando se abra el modal sino nos dara error
Modal.setAppElement("#root"); //Se agregara a root

export default function Layout() {

  //const { user, error } = useAuth({ middleware: "auth" });
  useAuth({ middleware: "auth" });//Un hook puede ser utilizado asi y saca las ventajas de useEffect y useState
  const { modal } = useQuiosco();

  //console.log(user);
  //console.log(error);

  return (
    <>
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          {/* Mantenemos el sidebar visible con las clases de tailwind */}
          <Outlet />
        </main>

        <Resumen />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </Modal>

      <ToastContainer />
    </>
  );
}
