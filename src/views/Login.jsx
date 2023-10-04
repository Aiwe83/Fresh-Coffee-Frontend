import { createRef, useState } from "react";
import { Link } from "react-router-dom"; // Se utiliza para que la pagina no recargue  y se vea mas fluido
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  //Esto nos regresara lo que coloquemos en el formulario

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/"
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    //console.log(datos); Debug para ver por consola los datos ingresados
    login(datos,setErrores);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido debes iniciar Sesión</p>

      <div className="bg-white shadow-md rounded-md px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {/*  Lo que coloque entre la apertura y el cierre toma ese children que creamos en Alerta.jsx asi es mas dinamico */}
          {errores
            ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
            : null}

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="email"
              placeholder="Correo Electronico"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="password"
              placeholder="Escribe tu clave"
              ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/registro" className="block text-center text-slate-500">
          ¿Ya tienes Cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
