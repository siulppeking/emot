import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '../components/Loading';

const AboutPage = () => {
  const [data, setData] = useState([]);
  /*   const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('pagina') || 1;
    const limit = queryParams.get('limite') || 5;
  
    const [datos, setDatos] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRoles = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_API_SEGURIDAD}/api/v1/roles?pagina=${page}&limite=${limit}`);
          setDatos(response.data.respuesta);
          setError(null);
        } catch (err) {
          setError(err);
        }
        setIsLoading(false);
      };
  
      fetchRoles();
    }, [page, limit]); */

  /*  const handlePageChange = (newPage) => {
     navigate(`?pagina=${newPage}&limite=${limit}`);
   }; */




  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(response.data);
    }
    getAllUsers();
  }, [])

  // Función para manejar la creación de un elemento
  const handleCreate = async () => {
    try {
      toast.success('Elemento creado exitosamente!');
    } catch (error) {
      toast.error('Error al crear el elemento!');
    }
  };

  // Función para manejar la actualización de un elemento
  const handleUpdate = async (id) => {
    try {
      toast.success('Elemento actualizado exitosamente!');
    } catch (error) {
      toast.error('Error al actualizar el elemento!');
    }
  };

  // Función para manejar la eliminación de un elemento
  const handleDelete = async (id) => {
    try {
      toast.error('Elemento eliminado exitosamente!');
    } catch (error) {
      toast.error('Error al eliminar el elemento!');
    }
  };


  /*   if (isLoading) return <Loading />; */
  /*   if (error) return <div>Error: {error.message}</div>;
   */
  return (
    <div className="container animate__animated animate__fadeIn">
      <h1>React Toastify con Axios</h1>
      <Link to='/' className='btn btn-primary'>Regresar al home</Link>
      <button className='btn btn-success' onClick={handleCreate}>Crear</button>

      <ul>
      {
        data.map(item => (
          <li key={item.id}>
            {item.name}
            <button className='btn btn-primary ms-3' onClick={() => handleUpdate(item.id)}>Editar</button>
            <button className='btn btn-danger ms-1' onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))
      }
      </ul>
     
      <ToastContainer />
    </div>
  );
}

export default AboutPage