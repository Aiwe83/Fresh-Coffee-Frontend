/* eslint-disable react/prop-types */
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({
  producto,
  botonAgregar = false,
  botonDisponible = false,
}) {
  const { handleModalClick, handleSetProducto, handleClickProductoAgotado } = useQuiosco();
  const { nombre, imagen, precio } = producto;

  return (
    // El return solo se utiliza para mostrar informacion
    <div className="border p-3 shadow bg-white">
      <img
        alt={`imagen ${nombre}`}
        className="w-full"
        src={`/img/${imagen}.jpg`}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        {botonAgregar && (
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white  w-full  mt-5 p-3 uppercase font-bold"
            //Se coloca una funcion callback para cuando precione en agregar quiero filtrar ese producto para pasar su informacion dentro del modal
            onClick={() => {
              //Habilitamos el modal
              handleModalClick();
              //Añadimos un producto a nuestro provider
              handleSetProducto(producto);
            }}
          >
            Agregar al carrito
          </button>
        )}
        {botonDisponible && (
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white  w-full  mt-5 p-3 uppercase font-bold"
            //Se coloca una funcion callback para cuando precione en agregar quiero filtrar ese producto para pasar su informacion dentro del modal
            onClick={() => handleClickProductoAgotado(producto.id)}
          >
            Producto Agotado
          </button>
        )}
      </div>
    </div>
  );
}
