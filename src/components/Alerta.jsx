/* eslint-disable react/prop-types */
export default function Alerta({ children }) { //Le pasamos el prop children 


    return (

        //Aqui mostramos los mensajes de alerta de errores
        <div className="text-center my-2 bg-red-600 text-white p-3 uppercase font-bold">
            {children} {/* y lo que le pasemos se inyecta automaticamente ahi  */}
        </div>
    )
}
