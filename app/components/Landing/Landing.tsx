import React from 'react'
import Link from 'next/link'

const Landing = () => {
    return (
        <div className="">
        <div className="flex flex-col">
        <div className="bg-bottom bg-no-repeat bg-cover" style={{ background: 'linear-gradient(90deg, rgba(255,92,57,1) 0%, rgba(166,85,35,1) 49%, #cfb8b8 100%)' }}>
            <header className="z-20 w-full xl:px-0 px-2">
            <div className="container mx-auto flex flex-wrap mt-8 mb-8 ">
                <div className="flex sm:w-1/2 flex">
                <h1 className="text-2xl text-white ml-1 font-bold">Nest</h1>
                </div>
                <div className="w-1/2 hidden sm:flex justify-end">
                <button className="border border-white bg-transparent uppercase rounded-full py-2 px-4 hover:bg-yellow-400 text-white">Login</button>
                </div>
            </div>
            </header>
            <section className="w-full">
            <div className="container mx-auto flex flex-row sm:items-center xl:pb-16 xl:px-0 px-4">
                <div className="w-1/2 text-white flex flex-col">
                <h1 className="sm:text-5xl text-xl font-weight-bolder sm:mb-4">Nest, tu hogar es donde estés.</h1>
                <h2 className="sm:text-2xl text-base mb-2">Propiedades en venta y alquiler.</h2>
                    <div className="xl:mt-4 mt-8 flex hidden xl:flex">
                        <Link className="px-8 m-5 bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500" href="../../Views/Buy">Comprar</Link>
                        <Link className="px-8 m-5 bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500" href="../../Views/Rent">Alquilar</Link>
                    </div>
                    <div className='xl:mt-4 mt-8 flex hidden xl:flex'>
                        <Link className="px-8 m-5 bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500" href="../../Views/FormCreate">Publicar Inmueble</Link>
                        <Link className="px-8 m-5 bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500" href="../../Views/home">Ver todas las propiedades</Link>
                    </div>
                </div>
                <div className="w-1/2 xl:pt-8 xl:items-center flex justify-end">
                    <img className="xl:w-3/5 filter brightness-10 mix-blend-normal" src="https://aiterra-files.s3.amazonaws.com/static/images/deliveringhome.jpg" alt="Home" />
                </div>
            </div>
            </section>
        </div>
        <div className="bg-white pb-8 w-full pt-8">
            <div className="container mx-auto">
            <div className="text-center w-full pb-16">
                <h3 className="uppercase sm:text-3xl text-2xl text-black-800 pt-4 xl:w-1/2 mx-auto">Te acompañamos en cada paso</h3>
            </div>
            <div className='text-center flex justify-around gap-10 aling-center p-2'>
                <div className='flex flex-col gap-10 w-5/6 sm:w-1/2 p-6 gap-1 shadow-xl hover:shadow-2xl rounded-xl'>
                    <h3 className='text-3xl text-gray-800 font-bold leading-none mb-3'>Búsqueda clara y rápida</h3>
                    <p className='text-gray-600 mb-8'>Pensamos nuestros filtros, mapas y comparadores de avisos para simplificarte la experiencia.</p>
                </div>
                <div className='flex flex-col gap-10 w-5/6 sm:w-1/2 p-6 w-5/6 sm:w-1/2 p-6 gap-1 shadow-xl hover:shadow-2xl rounded-xl'>
                    <h3 className='text-3xl text-gray-800 font-bold leading-none mb-3'>Tenés tu propia sección</h3>
                    <p className='text-gray-600 mb-8'>Desde tu cuenta podés acceder de forma segura a los avisos contactados y favoritos.</p>
                </div>
                <div className='flex flex-col gap-10 w-5/6 sm:w-1/2 p-6 w-5/6 sm:w-1/2 p-6 gap-1 shadow-xl hover:shadow-2xl rounded-xl'>
                    <h3 className='text-3xl text-gray-800 font-bold leading-none mb-3'>Unete Nest!</h3>
                    <p className='text-gray-600 mb-8'>Unite a Nest y encontrá tu verdadero hogar.</p>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Landing
