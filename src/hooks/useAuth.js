import { useEffect } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";//Vamos hacia la url
import clienteAxios from "../config/axios";

/*
 "SWR" es una librería de React que permite manejar el estado de la caché de datos de una aplicación web.
Esta librería se encarga de manejar la lógica de caché y revalidación de datos, lo que permite mejorar
el rendimiento de la aplicación al reducir la cantidad de peticiones HTTP que se realizan al servidor. 
SWR se puede utilizar en conjunto con Axios, que es una librería de JavaScript que permite realizar peticiones
HTTP desde el cliente (navegador) o desde el servidor (por ejemplo, Node.js).

En "Laravel", "Axios" se puede utilizar para realizar solicitudes HTTP desde el cliente a la API de Laravel.
Por ejemplo, se puede utilizar Axios para enviar datos de un formulario a la API de Laravel para su procesamiento.
Para utilizar Axios en Laravel, primero se debe instalar la librería en el proyecto utilizando npm. Luego, se puede 
importar Axios en el archivo JavaScript correspondiente y utilizar sus métodos para realizar solicitudes HTTP1.
*/


//Con este hook manejaremos toda la parte del Login, Registro y Logout.
export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const navigate = useNavigate();

  // mutate: revisa o revalida al usuario loggeado y lo mandas a llamar mas abajo
  const { data: user, error, mutate } = useSWR("/api/user", () => clienteAxios("/api/user", {

    headers: {
      //Damos la autorizacion para retornar el usuario
      Authorization: `Bearer ${token}`,
    },

    //useSWR no es asincrono asi que agregamos esta linea de Promesa
  })
    .then((res) => res.data)
    .catch((error) => {
      throw Error(error?.response?.data?.errors); //El ? se llamo "Optional Changing" ya que puede ser que no este disponible todo el tiempo
    })
  );


  //Login
  const login = async (datos, setErrores) => {

    //Try-Catch
    try {
      //Estos son los datos que se enviaran al backend(endpoint). En este caso se envian como un objeto plano
      const { data } = await clienteAxios.post("/api/login", datos);

      //Se almacena el token en local Storage
      localStorage.setItem("AUTH_TOKEN", data.token);

      //Si todo va bien
      setErrores([]); //Lo seteamos como un arreglo vacio
      await mutate(); // mutate() Revisa o revalida al usuario loggeado

      //console.log(respuesta);
      console.log(data.token);

      
    } catch (error) {
      //console.log(error)
      setErrores(Object.values(error.response.data.errors));
    }
  };

  //Register
  const registro = async (datos, setErrores) => {
    try {
      //Estos son los datos que se enviaran al backend(endpoint). En este caso se envian como un objeto plano
      const { data } = await clienteAxios.post("/api/registro", datos);
      //console.log(respuesta);
      //console.log(data.token);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]); //Lo seteamos como un arreglo vacio para que lo limpie
      await mutate(); // mutate() Revisa o revalida al usuario loggeado con SWR
    } catch (error) {
      //console.log(error)
      setErrores(Object.values(error.response.data.errors));
    }
  };

  //Boton Cancelar Orden o Logout
  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          //Damos la autorizacion para retornar el usuario
          //Le pasamos el token para que se comunique con Sanctum
          Authorization: `Bearer ${token}`,
        },
      });

      //Cuando se pasa undefined como argumento a mutate, React Query asume que estás invalidando
      //la caché asociada con la clave que proporcionaste anteriormente en una operación de consulta.
      // Esta es una forma de forzar la recarga de los datos después de realizar una acción como cerrar sesión.
      
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }

    //console.log('click'); para ver si Cancelar Orden funciona
  };


  //console.log(user);
  //console.log(error);
  

  //Validaciones de autenticacion y filtramos la ruta de las paginas correspondientes del usuario y el administrador

  useEffect(() => {

    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "guest" && user && user.admin) {
      navigate("/admin");
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
  }, [user, error, middleware, navigate, url]);

  //console.log(user);
  //console.log(middleware);

  return {
    login,
    registro,
    logout,
    user,
    error,
  };
};
