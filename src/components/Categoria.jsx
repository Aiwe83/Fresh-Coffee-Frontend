import useQuiosco from "../hooks/useQuiosco";
export default function Categoria({ categoria }) {
  const { handleClickCategoria, categoriaActual } = useQuiosco();
  const { icono, id, nombre } = categoria;

  //Dejar marcada la categoria actual
  const resaltarCategoriaActual = () =>
    categoriaActual.id === id ? "bg-amber-400" : "bg-white";

  return (
    <>
      <div
        className={`${resaltarCategoriaActual()}
          flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
      >
        <img
          alt="Imagen Icono"
          src={`/img/icono_${icono}.svg`}
          className="w-12"
        />
        <button
          className="text-lg font-bold cursor-pointer truncate"
          type="button"
          // Es muy importante crear una funcion callback para que funcione bien
          onClick={() => handleClickCategoria(id)}
        >
          {nombre}
        </button>
      </div>
    </>
  );
}
