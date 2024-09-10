import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/NavBar';
import { SpanError } from '../components/SpanError';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {
  const navigate=useNavigate();

  const {updatedUser }=useAuthStore();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handSubmit =async (data, e)=>{
      const info = data;
      try {
        const response = await fetch('https://candidates-exam.herokuapp.com/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(info),
            });
        
            if (!response.ok || response.status==401) {
              const resultError = await response.json();
              Object.values(resultError).forEach(value => {
                if (value == 'unauthorized') {
                  toast.error( `Usuario: ${data.email} credencial Invalida` , {
                    position: "top-right"
                    });
                }
              
              });
              
                return;
             }
       
      const result = await response.json();
      updatedUser(result);
      toast.success('Login Correcto!!', {
            position: "top-center"
            });
      navigate('/curriculum');
      } catch (error) {
        toast.error("Error servirdor!" + error,  {
          position: "top-right"
        });
        
      }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-900 p-6  flex-col rounded-lg shadow-lg w-1/2 flex items-center justify-center">
      <div className="bg-gray-200 mt-1 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">

      <form  onSubmit={ handleSubmit(handSubmit)} 
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
       >
      <Navbar url={'Registrarse'} mensaje={'¿No tienes usuario?'} />
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" >Iniciar Sesion</h2>
            <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">Correo:</label>
            <input type="text"  name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register('email',{
              required:'Correo requerido',
              pattern:{
                value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:'Email invalido, Ejemplo : manuel@gmail.com'
              }
            })}
            />
            {
              errors.email?( <SpanError message={errors.email.message} />):''
             }
        </div>
        <div className="space-y-2">
            <label htmlFor="Password" className="block text-gray-700 font-medium">Password:</label>
            <input type="password"  name="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            { ...register('password',{
                required:'Contraseña requerida',
            })}
            />
             {
              errors.password?(<SpanError message={errors.password.message} /> ):''
             }
          </div>
            <button 
             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50" type="submit">Enviar</button>
        </form>
        </div>
        <ToastContainer />
    </div>
    </div>
  )
}
