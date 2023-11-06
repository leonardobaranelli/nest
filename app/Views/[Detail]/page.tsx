// "use client";

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetPostQuery } from "@/redux/services/api";
import { Post } from "@/redux/services/api";

function Detail() {
  const { Detail } = useParams<{ Detail: string }>();
  const [property, setPropertyServer] = useState<Post[] | undefined>(undefined);

  const { data } = useGetPostQuery(Detail);
  console.log(data)


  useEffect(() => {
    setPropertyServer(data);
  }, [data]);

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }
  return (
    <div className="md:container md:mx-auto mx-auto">
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          {property[0].images?.map((imagen, index) => (
            <img
              key={index}
              src={imagen}
              alt=""
              className="w-full h-64 object-cover mt-10"
            />
          ))}
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
              {property[0].title}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              {property[0].title}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-xl leading-4 text-gray-800 dark:text-gray-300">
              {property[0].description}
            </p>
          </div>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
              Precio: ${property[0].price}
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
              Dias: {property[0].days}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Tipo: {property[0].type}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Condicion: {property[0].condition}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Locacion: {property[0].country} {property[0].city}
            </p>
            <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
              Domicilio: {property[0].streetName} {property[0].streetNumber}{" "}
              {property[0].aptNumber}
            </p>
          </div>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200">
              <div
                data-menu
                className="flex justify-between items-center cursor-pointer"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
