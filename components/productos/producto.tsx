"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Producto } from "@/model/Producto";
import Link from 'next/link'; 
export const ProductoCard = ({ producto }: { producto: Producto }) => {
  const { id, nombre, precio, descripcion, categoria } = producto;
  const [isClient, setIsClient] = useState(false);
 

  // Verificar si el código está ejecutándose en el cliente
  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);



  return (
    <div className="grid bg-gray-700 opacity-60 grid-cols-12 text-center py-2 px-3 border-b border-gray-300 divide-x-2 divide-gray-300">
      <div className="col-span-3">{nombre}</div>
      <div className="col-span-2">${precio}</div>
      <div className="col-span-4">{categoria}</div>
      
      <div className="col-span-2">
      <Link href={`/pages/producto/${id}`} className="flex justify-center">
      <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-2 me-1 mb-1 ">Ver más</button>
      </Link>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.object.isRequired,
};
