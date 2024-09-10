import React, {  useState } from 'react'
import useAuthStore from '../store/authStore'
import { ToastContainer, toast } from 'react-toastify';
import PdfViewerComponent from '../components/PdfViewerComponent';
import Navbar from '../components/NavBar';


export const CurriculumPage = () => {

  const {user} = useAuthStore();
  const {url }= user;
  //inicio logica
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
//inici get curriculum
  

  //get finaliza

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const isPdf = selectedFile.type === 'application/pdf';
      const isValidSize = selectedFile.size <= 5 * 1024 * 1024; // 5MB in bytes

      if (!isPdf) {
        setError('Please upload a PDF file.');
        setFile(null);
      } else if (!isValidSize) {
        setError('El archivo no puede ser mayor de 5Mb.');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!user.token) {
      alert('No esta registrado!!');
      return;
    }
    if (file && user.token) {
      const formData = new FormData();
      formData.append('curriculum', file);

      //logica trycatch
      try {
        const response = await fetch(`https://candidates-exam.herokuapp.com/api/v1/usuarios/${url}/cargar_cv`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        });
        const res = await response.json();
  
        if (response.ok) {
          toast.success(res.mensaje, {
            position: "top-center"
            });
            setRefresh(!refresh);
            setFile(null)
        } else {
          setError('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('An error occurred while uploading the file.');
      }
      //finaliza trycatch
      
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6  flex-col rounded-lg shadow-lg w-1/2 flex items-center justify-center">
    
      <Navbar url={'logout'} />
    <h2 className="text-2xl font-bold mb-4">Subir Curriculum Vitae</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Curriculum (Solo archivos con extension PDF, max 5MB)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-700 bg-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-indigo-800"
        />
        {error && <p className="text-red-500 text-xl">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled={!file}
      >
        Subir
      </button>
    </form>

    {/* mostrar curriculum */}
    <PdfViewerComponent user={user} refresh={refresh}/>
    <ToastContainer />

  </div>
  </div>

  )
}
