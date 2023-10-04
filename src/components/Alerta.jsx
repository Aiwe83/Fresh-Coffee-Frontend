export default function Alerta({ children }) {
    return (
        <div className="text-center my-2 bg-red-600 text-white p-3 uppercase font-bold">
            {children}
        </div>
    )
}
