import axios from 'axios'; // Asegúrate de importar axios correctamente
import { API } from "@/config/constants";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


const login = async (data) => {
    try {
        const response = await axios.post(API + '/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (response.data != null) {

            // Obtener el token del usuario de los datos
            const token = response.data.token;
            console.log(response.data.token);
            //const resultado = response.data.resultado;
            //const msj = response.data.msj;
           // const refreshToken = response.data.refreshToken
            //crea la cookie
            const expiracion = new Date(new Date().getTime() + 1000 * 60 * 60 * 10); 
            Cookies.set("token", token, { expires: expiracion });

            const decode = jwtDecode(token);
            
            //Guardar otros datos en cookies si es necesario
            Cookies.set("nombre", decode.nombre, { expires: expiracion });
            Cookies.set("id", decode.id, { expires: expiracion });
            Cookies.set("direccion", decode.direccion, { expires: expiracion });
            //Cookies.set("refreshToken", refreshToken,{ expires: expiracion } );

       // Guardar información en localStorage solo en el navegador
       if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("id", decode.id);
        localStorage.setItem("nombre", decode.nombre);
        localStorage.setItem("direccion", decode.direccion);
    }
            //localStorage.setItem("refreshToken", refreshToken)
           //localStorage.setItem("id",decode.nameid );

        } else {
            console.error('No se encontró el token en la respuesta del servidor');
        }

        return response.data; // Puedes retornar más información si es necesario

    } catch (error) {
        throw error;
    }
}

const Logout =  () => {

      // Eliminar las cookies al cerrar sesión
    Cookies.remove("nombre");
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("direccion");
    
    
  // Guardar información en localStorage solo en el navegador
  if (typeof window !== "undefined") {
    localStorage.remove("token", token);
    localStorage.remove("id", decode.id);
    localStorage.remove("nombre", decode.nombre);
    localStorage.remove("direccion", decode.direccion);
}
    return true;
}




export { login, Logout }
 