"use client";
import { useRouter } from 'next/navigation';

const NoAutorizado = () => {
  const router = useRouter();

  const redirect = () => {
    router.push('/');
  }

  return (
    <section className="ezy__httpcodes3 light py-48 md:py-80 bg-white dark:bg-[#0b1727] text-[#04004d] dark:text-white relative overflow-hidden z-[1]">
    {/* svg */}
    <img
        className="absolute bottom-0 right-0 -z-[1]"
        src="https://cdn.easyfrontend.com/pictures/httpcodes/three.svg"
        alt=""
    />

    <div className="container px-4 mx-auto">
        <div className="flex justify-center lg:justify-start">
            <div className="text-center lg:text-start">
                <h2 className="text-8xl leading-none font-bold md:text-[160px] mb-6">
                    Upss!
                </h2>
                <p className="text-3xl leading-none md:text-5xl opacity-80">
                    No estas autorizado!
                </p>
        <div className="mt-4 container px-4 flex justify-center">
            <a
              onClick={redirect}
              className="bg-blue-600 rounded-full p-3 hover:bg-opacity-90 duration-300 text-white text-xl inline-flex cursor-pointer"
            >
              <i className="fas fa-arrow-left"></i> 
            </a>
          </div>
            </div>
           
            
        </div>
    </div>
</section>
  );
}  

export default NoAutorizado;
