"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Producto } from "@/model/Producto";
import { agregarProductoAlBackend } from "@/services/productos/api";
import Swal from 'sweetalert2';
import NoAutorizado from '@/components/noAutorizado/NoAutorizado';
import useAuth from '@/services/customHooks/api';

export default function AgregarProducto() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState<Producto>({
    id : 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    categoria: ''
  });

  useEffect(() => {
    // Asegurarse de que el código se ejecuta solo en el navegador
    if (typeof window !== "undefined") {
      setNombre(localStorage.getItem("nombre") || "");
      setProducto(prevProducto => ({
        ...prevProducto,
        id: Number(localStorage.getItem("id")) || 0
      }));
    }
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'precio' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!producto.nombre || !producto.descripcion || !producto.categoria || producto.precio <= 0) {
      setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
      return;
    }

    setError(null);
    console.log("Producto agregado:", producto);

    try {
      const response = await agregarProductoAlBackend(producto);
      if (response === 200) {
        Swal.fire({
          title: '¡Producto agregado',
          text: 'Se ha agregado el producto.',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#007bff',
        }).then(() => {
          router.push('/pages/home');
        });
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('El producto no pudo agregarse ');
            break;
          default:
            setError('Error en la petición al servidor');
        }
      } else {
        setError('Error en la petición al servidor');
      }
    }

    setProducto({
      id: 0,
      nombre: '',
      precio: 0,
      descripcion: '',
      categoria: ''
    });
  };

  const { isAuthorized, checkedAuth } = useAuth();
  if (!checkedAuth) {
    return null;
  }
  if (!isAuthorized) {
    return <NoAutorizado />;
  }

  return (
    <section
      className="ezy__contact13 light bg-center bg-cover bg-no-repeat py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white"
      style={{
        backgroundImage:
          "url(https://cdn.easyfrontend.com/pictures/contact/contact13.jpg)",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="col-span-12 md:col-span-5 mb-12">
          <h1 className="text-3xl text-gray-700 md:text-[52px] lg:text-[65px] font-bold leading-tight mb-4">
            Pintureria:
            <span className="relative text-blue-600"> {nombre}</span>
            <br />
            Stock y productos
          </h1>
        </div>
        <div className="bg-white opacity-85 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl text-gray-700 font-bold mb-4">Agregar Producto</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="grid grid-cols-12 gap-4 lg:gap-8"
          >
            <div className="col-span-12 md:col-span-6 mb-3">
              <input
                className="text-gray-900 max-h-14 w-full bg-transparent border-b-2 border-gray-400 placeholder:text-gray-900 opacity-90 transition ease-in-out duration-700 focus:border-b-blue-700 focus:outline-none py-4"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-12 md:col-span-6 mb-3">
              <input
                className="text-gray-900 max-h-14 w-full bg-transparent border-b-2 border-gray-400 placeholder:text-gray-900 opacity-90 transition ease-in-out duration-700 focus:border-b-blue-700 focus:outline-none py-4"
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={producto.categoria}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-12 md:col-span-12 mb-3">
              <textarea
                className="text-gray-900 w-full bg-transparent border-b-2 border-gray-400 placeholder:text-gray-900 opacity-90 transition ease-in-out duration-700 focus:border-b-blue-700 focus:outline-none py-4"
                name="descripcion"
                placeholder="Descripción"
                rows={5}
                value={producto.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-12 md:col-span-6 mb-3 flex items-center">
              <label className="mr-4 text-gray-900">Precio:$</label>
              <input
                className="text-gray-900 max-h-14 w-full bg-transparent border-b-2 border-gray-400 placeholder:text-gray-900 opacity-90 transition ease-in-out duration-700 focus:border-b-blue-700 focus:outline-none py-4"
                type="number"
                step="1"
                name="precio"
                placeholder="Ingrese el precio" 
                value={producto.precio}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-12">
              <div className="text-center mt-4">
                <button className="bg-blue-600 text-white text-base py-3 px-10 min-w-44">
                  Agregar Producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
