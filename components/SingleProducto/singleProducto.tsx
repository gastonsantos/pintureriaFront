"use client";
import { Producto } from "@/model/Producto";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { eliminarProducto, guardarCambios } from "@/services/productos/api";
import Swal from 'sweetalert2';
const SingleProducto = ({ producto }: { producto: Producto | undefined }) => {
    const router = useRouter();
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [error, setError] = useState('');
  
    // Actualiza los estados cuando el producto esté disponible o cambie.
    useEffect(() => {
      if (producto) {
        setDescripcion(producto.descripcion || '');
        setPrecio(producto.precio || 0);
      }
    }, [producto]);
  

    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(e.target.value);
      };
    
      const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrecio(Number(e.target.value));
      };
    
      async function handleGuardarCambios ()  {
        // Aquí puedes manejar la lógica para guardar los cambios, como hacer una solicitud a una API
        const data = {
            //id: producto?.id,
            id: producto?.id,
            nombre: producto?.nombre, 
            precio: precio,
            cantidad: 6,
            descripcion: descripcion,
            categoria: producto?.categoria 
        }
       
    
        try {
            console.log("Data producto", data);
            const response = await guardarCambios(data);
            if (response != null) {
              
              router.push('/pages/home');
            } else {
              console.log("Hay algo", response);
              console.error('No se Pudieron Enviar los datos al backend');
            }
          } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                  case 400:
                    setError('Producto no encontrado ');
                    break;
                  default:
                    setError('Error en la petición al servidor');
                }
              } else {
                
                setError('Error en la petición al servidor');
              }
          }
        console.log("Guardando cambios...");
        console.log("Descripción:", descripcion);
        console.log("Precio:", precio);
      };

      async function handleEliminarProducto ()  {

          try {
            
            const response = await eliminarProducto(producto?.id);
            if (response != null) {
              
                Swal.fire({
                  title: '¡Producto eliminado',
                  text: 'Se ha eliminado el producto.',
                  icon: 'success',
                  confirmButtonText: 'Continuar',
                  confirmButtonColor: '#007bff',
                }).then(() => {
                  router.push('/pages/home');
                });
            
            } else {
              console.log("Hay algo", response);
              console.error('No se Pudieron Enviar los datos al backend');
            }
          } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                  case 400:
                    setError('Producto no encontrado, no se pudo eliminar');
                    break;
                  default:
                    setError('Error en la petición al servidor');
                }
              } else {
                
                setError('Error en la petición al servidor');
              }
          }



      }


  if (!producto) {
    return <p className="text-center text-gray-500">Cargando producto...</p>;
  }

  return (
    <div className="container opacity-85 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{producto.nombre}</h1>
      <p className="text-gray-600 mb-2">{producto.categoria}</p>

      

      <form className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
            Precio
          </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={handlePrecioChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="button" 
          onClick={handleGuardarCambios}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar cambios
        </button>
        <button
          type="button" 
          onClick={handleEliminarProducto}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Eliminar
        </button>
        <div className="text-red-500 text-lg">{error}</div>
      </form>
    </div>
  );
};

export { SingleProducto };
