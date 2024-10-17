"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Producto } from "@/model/Producto";
import NoAutorizado from '@/components/noAutorizado/NoAutorizado';
import useAuth from '@/services/customHooks/api';
import { obtenerProductoDetalle } from "@/services/productos/api";
import { SingleProducto } from '@/components/SingleProducto/singleProducto';

export default function ProductoDetalle() {
    const { id } = useParams();
    const productoId = Number(id); // Asegúrate de que id sea un número
    const [producto, setProducto] = useState(undefined);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerProductoDetalle(productoId);
                if (response) {
                    setProducto(response);
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };

        fetchData();
    }, [productoId]); // Añadir productoId como dependencia

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
            minHeight: "100vh", // Para que ocupe toda la altura del viewport
                backgroundSize: "cover", // Ajusta la imagen para cubrir toda la sección
                backgroundAttachment: "fixed", //

        }}
      >
        <div className="container px-4 mx-auto">
            <SingleProducto producto={producto} />
        </div>

        </section>
    );
}
