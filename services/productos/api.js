import axios from 'axios';
import { API } from "@/config/constants";
import axiosInstance from '@/services/interceptor/api'
async function obtenerProductos() {
/*  const data = {
    "id": localStorage.getItem("token")
  }
    */
  const data = {
    "id": 1
  }
    try {
      const response = await axiosInstance.post(API + "/api/todosLosProductosPorPintureria", data);
      //console.log('Obtener Productos', response.data);
      if(response.data!= null){
        return response.data;
      }
      
    } catch (error) {
      throw error; // Re-throw error for handling in the calling component
    }
  }

  async function obtenerProductoDetalle(id) {
    const data = {
      "id": id
    }
    try {
        // Usa el id como un parámetro de consulta en la URL
        const response = await axiosInstance.post(API+"/api/productoPorId", data);
        
        if (response.data != null) {
            return response.data;
        }
    } catch (error) {
        throw error; // Re-lanzar el error para manejarlo en el componente que llama
    }
}

async function guardarCambios(data){
  try {
    // Usa el id como un parámetro de consulta en la URL
    const response = await axiosInstance.post(API+"/api/guardarCambios", data);
    
    if (response.data != null) {
        return response.data;
    }
} catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente que llama
}
}


async function agregarProductoAlBackend(data){
  try {
    // Usa el id como un parámetro de consulta en la URL
    const response = await axiosInstance.post(API+"/api/agregarProducto", data);
    
    if (response.data != null) {
      console.log(response.status);
        return response.status;
    }
} catch (error) {
    throw error; // Re-lanzar el error para manejarlo en el componente que llama
}
}
  export { obtenerProductos, obtenerProductoDetalle,guardarCambios,agregarProductoAlBackend };
