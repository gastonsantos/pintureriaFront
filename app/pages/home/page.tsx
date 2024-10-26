"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Producto } from "@/model/Producto";
import { obtenerProductos } from "@/services/productos/api";
import { ProductoCard } from "@/components/productos/producto";
import { Logout } from '@/services/login/api';
import NoAutorizado from '@/components/noAutorizado/NoAutorizado';
import useAuth from '@/services/customHooks/api';

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1); // Estado para la página actual
  const productosPorPagina = 20; // Número de productos por página
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        setNombre(localStorage.getItem("nombre") || "");
      }

      try {
        const response = await obtenerProductos();
        if (response) {
          const data = response;
          setProductos(data);
          setProductosFiltrados(data); // Inicialmente, los productos filtrados son todos
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    if (Logout()) {
      router.push('/'); // Asegúrate de que esta ruta sea correcta
    }
  };

  const { isAuthorized, checkedAuth } = useAuth();

  if (!checkedAuth) {
    return null;
  }

  if (!isAuthorized) {
    return <NoAutorizado />;
  }
  const handleAgregarProducto = () => {
    router.push('/pages/producto/agregarProducto'); // Redirige a la página de agregar producto
  };
  // Función para manejar cambios en la búsqueda
  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);

    // Filtrar productos en función del valor de búsqueda
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valorBusqueda) ||
      producto.categoria.toLowerCase().includes(valorBusqueda) ||
      producto.descripcion.toLowerCase().includes(valorBusqueda)
    );

    setProductosFiltrados(productosFiltrados);
    setPaginaActual(1); // Reinicia a la primera página cuando hay una nueva búsqueda
  };

  // Calcular los productos que se mostrarán en la página actual
  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
  const productosPaginaActual = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
  };

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div>
      <section
        className="ezy__contact13 light bg-center bg-cover bg-no-repeat py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white"
        style={{
          backgroundImage:
            "url(https://cdn.easyfrontend.com/pictures/contact/contact13.jpg)",
           // "url(/free-photo-of-arte-creativo-modelo-estampado.jpeg)",
        }}
      >
        <div className="container px-4">
          <div className="container px-4 flex justify-end">
            <a
              onClick={logout}
              className="bg-blue-600 rounded-full p-3 hover:bg-opacity-90 duration-300 text-white text-xl inline-flex cursor-pointer"
            >
              <i className="fas fa-sign-out-alt"></i> {/* Icono de cerrar sesión */}
            </a>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5 mb-12">
              <h1 className="text-3xl text-gray-700 md:text-[52px] lg:text-[65px] font-bold leading-tight mb-4">
                Pintureria:
                <span className="relative text-blue-600">{nombre} </span>
                Stock y productos
              </h1>
            </div>
            {/* Botón de Agregar Producto */}
            <div className="col-span-12 mb-6 flex justify-end">
              <button
                onClick={handleAgregarProducto}
                className="bg-green-600 rounded-full p-3 hover:bg-opacity-90 duration-300 text-white text-xl"
              >
                <i className="fas fa-plus"></i> Agregar Producto
              </button>
            </div>
            {/* Buscador */}
            <div className="col-span-12 mb-6">
              <input
                type="text"
                value={busqueda}
                onChange={handleBusquedaChange}
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 border rounded-lg text-black"
              />
            </div>

            {/* Encabezado de columnas */}
            <div className="col-span-12 bg-gray-700 opacity-60">
              <div className="grid grid-cols-12 text-center bg-black-100 py-2 px-3 border-b-2 border-gray-300 divide-x-2 divide-gray-300">
                <div className="col-span-3 font-bold">Producto</div>
                <div className="col-span-2 font-bold">Precio</div>
                <div className="col-span-4 font-bold">Categoría</div>
                <div className="col-span-3 font-bold"></div>
              </div>
            </div>

            {/* Listado de productos filtrados */}
            {productosPaginaActual.length > 0 ? (
              productosPaginaActual.map((producto) => (
                <div className="col-span-12 " key={producto.id}>
                  <ProductoCard producto={producto} />
                </div>
              ))
            ) : (
              <p className="col-span-12 text-center">No hay productos disponibles.</p>
            )}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => cambiarPagina(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${paginaActual === i + 1 ? "bg-blue-600 text-white" : "bg-black-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
