import React, { useEffect, useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

const PdfViewerComponent = ({user, refresh}) => {
  const [resumeUrl, setResumeUrl] = useState(null);
 

    useEffect(() => {
        const fetchResume = async () => {
          try {
            const response = await fetch('https://candidates-exam.herokuapp.com/api/v1/usuarios/mostrar_cv', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch resume');
            }
          
            const data = await response.json();
            setResumeUrl(data.url); 
          } catch (error) {
           
          }
        };
    
        fetchResume();
      }, [refresh]);
  return (
    <div className="max-w-lg mt-4 mx-auto p-6 bg-gray-400 rounded-md shadow-md">
  
  

      {resumeUrl ? (
        <div>
         
          <a
            href={resumeUrl}
            
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Decargar - { `..${user.url}.pdf`}
          </a>
        </div>
      ) : (
        <p className="text-gray-500">No hay curriculum...</p>
      )}
    </div>);
}

export default PdfViewerComponent;