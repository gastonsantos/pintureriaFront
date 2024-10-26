"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/login/api';

const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(true); // Estado para mostrar u ocultar las credenciales

  async function enviarLoginAlBackend() {
    const data = {
      username: usuario,
      password: password
    };

    try {
      const response = await login(data);
      if (response != null) {
        console.log("Hay algo", response.data);
        router.push('/pages/home');
      } else {
        console.log("Hay algo", response);
        console.error('No se Pudieron Enviar los datos al backend');
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('No coinciden Email y/o Contraseña');
            break;
          default:
            setError('Error en la petición al servidor');
        }
      } else {
        console.error('Error al iniciar sesión:', error.message);
        setError('Error en la petición al servidor');
      }
    }
  }

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen relative">
      {/* Contenido del login */}
      <div className="w-1/2 h-screen hidden lg:block">
        {/* Botón y cartel para pantallas grandes (lg) */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md py-2 px-4"
          >
            Información
          </button>

          {/* Mostrar las credenciales si showCredentials es true */}
          {showCredentials && (
            <div className="mt-2 bg-black p-4 text-white border border-gray-300 rounded-md shadow-lg">
              <p>Este es un proyecto realizado por Gaston Santos. </p>
              <p>Backend: Api rest en Java Spring</p>
              <p>Frontend: Next js</p>
              <p>Este proyecto contiene, inicio de sesion y seguridad con JWT. </p>
              <p>Excepciones personalizadas y control de HTTP status Code propio. </p>
              <p>Validaciones tanto en Front como Back. </p>
              <p><strong>Demo:</strong> </p>
              <p><strong>Pintureria Veronica</strong> </p>
              <p><strong>Usuario:</strong> roberto123</p>
              <p><strong>Contraseña:</strong> 12345</p>
              <p><strong>Pintureria Conurbano</strong> </p>
              <p><strong>Usuario:</strong> conurbano1234</p>
              <p><strong>Contraseña:</strong> 12345</p>
            </div>
          )}
        </div>
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenido del formulario */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        {/* Botón y cartel para pantallas pequeñas y medianas (sm, md) */}
        <div className="absolute block lg:hidden top-3 left-4">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md py-1 px-2 sm:py-1 sm:px-1"
          >
            Información
          </button>

          {/* Mostrar las credenciales si showCredentials es true */}
          {showCredentials && (
            <div className="mt-1 bg-black text-sm p-2 w-128 text-white border border-gray-300 rounded-md shadow-lg">
              <p>Este es un proyecto de prueba Api rest en Java Spring.</p>
              <p>Con inicio de sesion y seguridad JWT, con excepciones personalizadas.</p>
              <p><strong>Pintureria Veronica</strong> </p>
              <p><strong>Usuario:</strong> roberto123</p>
              <p><strong>Contraseña:</strong> 12345</p>
              <p><strong>Pintureria Conurbano</strong> </p>
              <p><strong>Usuario:</strong> conurbano1234</p>
              <p><strong>Contraseña:</strong> 12345</p>
            </div>
          )}
        </div>

        {/* Formulario de login */}
        <h1 className="text-2xl font-semibold text-black mb-4">Ingresar</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Previene la recarga de la página
            enviarLoginAlBackend();
          }}
        >
          <div className="mb-4 bg-sky-100">
            <label htmlFor="username" className="block text-gray-600">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => { setUsuario(e.target.value) }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-green-500 text-center">
          {error && (
            <div className="mb-5 text-red">
              <label className="text-red-500">{error}</label>
            </div>
          )}
        </div>
        <div className="flex justify-center">

          <a href="https://www.linkedin.com/in/gaston-santos-654748227/" className="me-8 [&>svg]:h-8 [&>svg]:w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 448 512">
              <path
                d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
            </svg>
          </a>
          <a href="https://github.com/gastonsantos" className="[&>svg]:h-8 [&>svg]:w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 496 512">
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
