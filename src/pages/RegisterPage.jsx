import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SpanError } from '../components/SpanError';
import Navbar from '../components/NavBar';
import { Navigate, useNavigate } from 'react-router-dom';


export const RegisterPage = () => {

      const navigate = useNavigate();

      const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
        const password = watch('password', ''); 

      const handSubmit =async (data, e)=>{
        const info = data;
        try {
          const response = await fetch('https://candidates-exam.herokuapp.com/api/v1/usuarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
              });

         if (!response.ok || response.status==422) {
          const resultError = await response.json();
          Object.values(resultError).forEach(value => {
            toast.error( `Error: ${value}` , {
            position: "top-right"
            });
          });
          
            return;
         }
         
          const result = await response.json();
                toast.success(result.email +'Registrado!!', {
                    position: "top-center"
                    });
                navigate('/Ingresar')
        } catch (error) {
          toast.error("Error servirdor!" + error,  {
            position: "top-right"
          });
          
        }
      }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 ">
      <div className="bg-blue-900  flex-col rounded-lg shadow-lg w-1/2 flex items-center justify-center p-4">
      <div className="bg-gray-200   rounded-lg shadow-lg w-1/2 p-4">
      <Navbar url={'Ingresar'} mensaje={'¿Ya tienes usuario?'} />
      <form 
      className="bg-white p-2 rounded-lg shadow-lg w-full max-w-md space-y-4"
      onSubmit={ handleSubmit(handSubmit)} >
            <h2 className="text-xl font-bold text-gray-800  text-center">Registro</h2>

            <div className="">
            <label htmlFor="nombre" className="block text-gray-700 font-medium">Nombre:</label>
            <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"  name="nombre" 
                { ...register('nombre', {
                  required:'Nombres requerido',
                   pattern:{
                    value:"[A-Za-z]+" ,
                    message:'Solo se admite letras: [a-Z]'
                   } 
                  })}
             />

             {
              errors.nombre ?(<SpanError message={errors.nombre.message} />):''
             }
          </div>

          <div className="space-y-2">
          
            <label htmlFor="correo" className="block text-gray-700 font-medium">Email:</label>
            <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="email"  name="email"
            {...register('email',{
              required:'Correo requerido',
              pattern:{
                value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:'Email invalido, Ejemplo : manuel@upa.com'
              }
            })}
            />
            {
              errors.email?( <SpanError message={errors.email.message} />):''
             }
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">Contraseña:</label>
            <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password" name='password' 
              {...register('password', {
                required: 'Contraseña requerida'
              })}
            
            />
            {
              errors.password?( <SpanError message={errors.password.message} />):''
             }
            </div>
            <div className="space-y-2">
            <label htmlFor="password_confirmation" className="block text-gray-700 font-medium">Confirmar Contraseña:</label>
            <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password" name="password_confirmation" 
             {...register('password_confirmation', {
              required: 'Confirme su Contraseña',
              validate: value =>
                value === password || 'Contraseñas no coinciden',
            })}
            />
           
          {errors.confirmPassword && <SpanError message={errors.confirmPassword.message} />}
          </div>
            <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            type="submit">Registrar</button>
        </form>

        <ToastContainer />
        </div>
    </div>
    </div>

  )
}
