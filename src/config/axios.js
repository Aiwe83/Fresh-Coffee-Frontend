import axios from "axios";

/* En "Laravel", "Axios" se puede utilizar para realizar solicitudes HTTP desde el cliente a la API de Laravel.
Por ejemplo, se puede utilizar Axios para enviar datos de un formulario a la API de Laravel para su procesamiento.
Para utilizar Axios en Laravel, primero se debe instalar la librería en el proyecto utilizando npm. Luego, se puede 
importar Axios en el archivo JavaScript correspondiente y utilizar sus métodos para realizar solicitudes HTTP1. */
 

//Creamos el cliente Axios
const clienteAxios = axios.create({

    //baseURL: La URL base para todas las solicitudes. Esta URL se toma de import.meta.env.VITE_API_URL,
    // lo que indica que se espera que la variable de entorno VITE_API_URL esté configurada utilizando 
    //alguna herramienta de entorno de desarrollo como Vite.
    baseURL: import.meta.env.VITE_API_URL,

    //headers: Se configuran algunos encabezados comunes para todas las solicitudes. En este caso, 
    //se establece que el cliente aceptará respuestas en formato JSON y que las solicitudes se considerarán
    // como solicitudes Ajax ('X-Requested-With': 'XMLHttpRequest').
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    
    //withCredentials: Se establece en true, lo que significa que las solicitudes enviarán y recibirán cookies
    // junto con la solicitud. Esto es útil cuando se trabaja con autenticación basada en cookies.
    withCredentials: true
})

export default clienteAxios