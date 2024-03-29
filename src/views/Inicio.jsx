import useSWR from "swr";
import Producto from "../components/Producto";
import clienteAxios from "../config/axios";
import useQuiosco from "../hooks/useQuiosco";

export default function Inicio() {
  const { categoriaActual } = useQuiosco();

  //Filtrar los productos por categoria actual

  //Consulta SWR

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>

    clienteAxios("/api/productos", { //Endpoint
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, isLoading } = useSWR("/api/productos", fetcher, { //Endpoint

    //Refrescamos con los productos que estan disponibles de forma automatica
    refreshInterval: 1000,
  });


  //console.log(data);
  //console.log(error);
  //console.log(isLoading);

  if (isLoading) return "Cargando ...";

  const productos = data.data.filter(
    (producto) => producto.categoria_id == categoriaActual.id
  );

  return (
    <>
      <h1 className="text-4xl font-black ">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
    </>
  );
}
