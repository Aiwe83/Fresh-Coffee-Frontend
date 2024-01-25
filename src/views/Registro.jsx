import { createRef, useState } from "react";
import { Link } from "react-router-dom"; // Se utiliza para que la pagina no recargue  y se vea mas fluido
import Alerta from "../components/Alerta";//Para mostrar los errores
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

  /* En Laravel, el método createRef crea un modelo nuevo con una referencia única. Esta referencia
  permite identificar cada instancia del modelo en la base de datos, facilitando la búsqueda y
  manipulación eficiente de datos. */

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errores, setErrores] = useState([]); //Para mostrar los errores

  const { registro } = useAuth({ middleware: "guest", url: "/", });

  //Prevenimos la accion con Default para que no recargue la pagina
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Estos son los datos(objeto) que enviaremos al backend de Laravel(endpoint)
    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,// password_confirmation: Esta palabra es propia de Laravel
    };

    //console.log(datos);  

    registro(datos, setErrores);

  };

  return (
    <div>
      <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
      <p>Crea tu cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md px-5 py-10">
        <form

          onSubmit={handleSubmit}
          noValidate //Para que no valide con la validacion de HTML5 en el formulario

        >


          {/* Mapea los erores y los muestra por pantalla
              Colocamos la prop key para que React lo identifique
           */}

          {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}{" "}

          {/* Datos a ingresar */}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="name"
              placeholder="Tu Nombre"
              ref={nameRef}
            />
          </div>
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
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">
              Repetir Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="password_confirmation"
              placeholder="Repite tu Clave"
              ref={passwordConfirmationRef}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
          />
        </form>

       {/*  Letra pequeña */}
      </div>
      <nav className="mt-5">
        <Link to="/auth/login" className="block text-center text-slate-500">
          ¿Ya tienes Cuenta? Inicia Sesión
        </Link>
      </nav>
    </div>
  );
}
