'use client'
import { useState } from 'react'

export default function Formulario() {

    const [values, setValues] = useState({
        usuario: '',
        imagen: null,
        titulo: '',
        descripcion: '',
        condicion: '',
        tipo: "",
        pais: '',
        ciudad: '',
        calle: '',
        numeroCalle: '',
        piso: '',
        numeroDepartamento: '',
        precio: '',
        ambientes: ""
    })

    function handleChange(e) {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }
    
    function handleImage(e) {
        const file = e.target.files[0]
        if(file) {
        setValues({...values, imagen: file})
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        // enviar datos a backend
    }

    return (
        <form className="bg-white p-10 rounded-lg shadow-md max-w-3xl">        
          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Título</label>
            
            <input
              type="text"
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div className="mb-5">
            <label>Tipo</label>
            <select 
              name="tipo"
              value={values.tipo}
              onChange={handleChange}  
            >
              <option value="alquiler">Alquiler</option>
              <option value="venta">Venta</option>
            </select>
          </div>

          <div className="mb-5">
            <label>Ambientes: </label>
            <input 
              type="number"
              name="ambientes"
              value={values.ambientes}
              onChange={handleChange} 
            />
          </div>
          
          <div className="mb-5">
            <label>País</label>
            <input 
              type="text"
              name="pais"
              value={values.pais}
              onChange={handleChange} 
            />
          </div>

          <div className="mb-5">
            <label>Ciudad</label>
            <input 
              type="text"
              name="ciudad"
              value={values.ciudad}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label>Calle</label>
            <input 
              type="text"
              name="calle"
              value={values.calle}
              onChange={handleChange} 
            />
          </div>

          <div className="mb-5">
            <label>Número de calle</label>
            <input 
              type="text"
              name="numeroCalle"
              value={values.numeroCalle}
              onChange={handleChange} 
            />
          </div>


          <div className="mb-5">
            <label>Precio</label>
            <input 
              type="text"
              name="precio"
              value= {values.precio} 
              onChange={(e) => handleChange(e, true)}            
              
            />  
          </div>
    
          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
    
            <textarea
              name="descripcion"
              value={values.descripcion}  
              onChange={handleChange}
              className="border p-2 w-full rounded-lg" 
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Imagen</label>
            
            <input
              type="file"
              name="imagen"
              onChange={handleImage}
              className="border p-2 w-full rounded-lg" 
            />
          </div>
    
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-500 rounded-lg"
          >
            Enviar
          </button>
    
        </form>
      )

}