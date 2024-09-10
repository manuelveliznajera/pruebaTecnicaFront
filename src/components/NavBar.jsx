import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ( {url, mensaje} ) => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); 
    window.location.href = '/login'; 
  };
    return (
      
        url=='logout'?(
      <nav className="bg-gray-600 flex flex-col items-center justify-center w-1/2 p-4 gap-2">
          <div >
            <Link to="/">
              <img src="/img/logo.jpg" alt="Logo" className="bg-gray-500 w-48 h-48 rounded-full object-cover" />
            </Link>
          </div>
      <div >
           <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      >
        Salir
      </button></div>
      </nav>)
      : (<nav className="bg-gray-400 p-1 flex flex-col justify-center  items-center w-full">
      <div className="mt-2 flex-col items-center justify-center">
        <Link to="/">
          <img src="/img/logo.jpg" alt="Logo" className="bg-gray-500 w-40 h-40 rounded-full object-cover"/>
        </Link>
      </div>
      <div className="mt-2 p-2">
        <span className='text-black font-bold'>{mensaje} </span><Link to={ `/${url}`} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">{url}</Link>
      </div>
    </nav>)
      
      )
    
  };
  
  export default Navbar;