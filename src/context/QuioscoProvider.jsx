/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios"; //Llamada a la API 

//Aca estamos utilizando Cantext API donde puedes pasar el state o funciones
//desde un componente principal hacia los hijos sin necesidad de pasarlo por
//cada componente.Tambien es posibloe actualizar el state desde el componente
// hijo o pasar una funcion que lo haga
const QuioscoContext = createContext();


//useState sirve para actualizar un estado por ejemplo si hay articulos en el carrito de compras. 
//Se utiliza solo en las partes mas dinamicas de mi aplicacion las partes que que el valor puede ser difernte a futuro.


//****************************************Hacemos disponibles States para todos los componentes*****************************************


const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  //console.log(categoriaActual)

  /*El método reduce() en JavaScript se utiliza para ejecutar una función reductora sobre 
  cada elemento de un array, devolviendo como resultado un único valor. Este método toma dos parámetros:
  la función reductora y el valor inicial. La función reductora recibe cuatro parámetros: el acumulador,
  el elemento actual, el índice y el array.
  Es útil para crear acumulados de datos, como sumar los números de un array, obtener el valor promedio de
  la suma de los números, filtrar valores, entre otras aplicaciones3
*/


//El hook useEffect en React se utiliza para incorporar funcionalidades que deben ocurrir después de que 
//el componente se renderice.Puede ser usado para tareas como peticiones a una API, suscripciones a eventos o
// manipulación del DOM.

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => producto.precio * producto.cantidad + total, 0);
    setTotal(nuevoTotal);
  }, [pedido]);

  //La librería Axios en JavaScript cumple la función de realizar peticiones HTTP de forma asíncrona tanto 
  //en el lado del cliente (navegador) como en el lado del servidor (Node.js). Esta librería es basada en promesas, 
  //lo que facilita el manejo de las respuestas de las peticiones.  

  //Promesa

  //Una promesa en JavaScript es un objeto que representa la terminación o el fracaso de una operación asíncrona,
  // permitiendo asociar controladores a dicha operación y proporcionando métodos que facilitan el manejo y la manipulación
  // de los datos una vez que la operación asíncrona ha finalizado.
  const obtenerCategorias = async () => {

    const token = localStorage.getItem("AUTH_TOKEN");
      
    try {

      // VITE_API_URL=http://localhost: Esta es nuestra variable de entorno esta en .env.local del proyecto react

      const { data } = await clienteAxios("/api/categorias", {  //Llamada a la API

        headers: {

          //Damos la autorizacion para retornar el usuario
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log(data.data); Vemos si estan pasando las categorias. El primer data es de axios el segundo data es de categorias.

      setCategorias(data.data);
      setCategoriaActual(data.data[0]);

    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);


 //********************************************************Hacemos disponibles Funciones ***************************************************************

  const handleClickCategoria = (id) => {
    //cat es una variable temporal
    //Es importante colocar [0] para que nos devuelva un obejto y no un array
    //El método filter crea un nuevo array con todos los elementos que pasan la prueba implementada por la función proporcionada.
    const categoria = categorias.filter((cat) => cat.id === id)[0];

    //Nunca hay que modificar el State por asignacion ·"categoriaActual = categoria", sino a la funcion que pertenece al State que
    // queremos modificar

    setCategoriaActual(categoria);
  };
  const handleModalClick = () => {
    //Con esta forma de negar el modal evitamos tener que crear dos funciones true y false y lo hacemos en automatico en un modal
    // haciendolo solamente en una. Osea si cambia si esta entrue lo cambia a false y viceversa
    setModal(!modal); //Si esta en false lo cambia a true y viceversa
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  //De esta forma eliminamos las propiedades categoria_id e imagen ya que no lo requerimos   
  const handleAgregarPedido = ({...producto }) => {

    //Agregamos productos al pedido

    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido");
    }
    //console.log(producto)
  };

  const handlerEditarCantidad = (id) => {

    //console.log(id);      

    const productoActualizar = pedido.filter(producto => producto.id === id)[0];
    setProducto(productoActualizar);
    setModal(!modal);
  };

  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Pedido Eliminado");
  };

  const handleSubmitNuevaOrden = async (logout) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(
        "/api/pedidos",
        {
          total,
          productos: pedido.map((producto) => {
            return {
              id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
        },
        {
          headers: {
            //Damos la autorizacion para retornar el usuario
            Authorization: `Bearer ${token}`
          },
        }
      );
      
      //Al confirmar el pedido limpiamos el pedido despues de 1 segundo
      toast.success(data.message);
      setTimeout(() => {
        setPedido([]);
      }, 1000);

      //Cerrar la sesion del usuario en 3 segundos para proteger la cuenta
      setTimeout(() => {
        localStorage.removeItem("AUTH_TOKEN");
        logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickCompletarPedido = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      await clienteAxios.put(`/api/pedidos/${id}`, null, {
        headers: {
          //Damos la autorizacion para retornar el usuario
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickProductoAgotado = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      await clienteAxios.put(`/api/productos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(categoriaActual);
  //console.log(categorias);  Debug de useState
  //const hola =  "Hola mundo"; Ejemplo como pasar un valor string.


  //Estados habilitados globalmente


  return (
    //Providers
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleModalClick,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handlerEditarCantidad,
        handleEliminarProductoPedido,
        total,
        handleSubmitNuevaOrden,
        handleClickCompletarPedido,
        handleClickProductoAgotado
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
