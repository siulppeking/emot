import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '../components/Loading';

const AboutPage = () => {

  const navigate = useNavigate();
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
        console.log(response.data.respuesta);
        setDatos(response.data.respuesta);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchRoles();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    navigate(`?pagina=${newPage}&limite=${limit}`);
  };




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


  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1>React Toastify con Axios</h1>
      <button onClick={handleCreate}>Crear</button>
      {/* Suponiendo que tienes una lista de elementos */}
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => handleUpdate(item.id)}>Editar</button>
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </div>
      ))}

      <div>
        <h1>Roles</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th className='text-center'>NOMBRE</th>
            </tr>
          </thead>
          <tbody>
            {
              datos.resultados.map((rol) => (
                <tr key={rol.rolId}>
                  <td className='text-center'>{rol.rolId}</td>
                  <td className='text-start'>{rol.nombre}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${(page <= 1) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(Number(page) - 1)} disabled={page <= 1}>
                Anterior
              </button>
            </li>
            {
              Array.from({ length: datos.totalPaginas }).map((_, index) => (
                <li className={`page-item ${(datos.paginaActual === index + 1) ? 'disabled' : ''}`} key={index + 1}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))
            }
            <li className={`page-item ${(page >= datos.totalPaginas) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(Number(page) + 1)} disabled={page >= datos.totalPaginas}>
                Siguiente
              </button>
            </li>
          </ul>
        </div>
        <p>Mostrando <em>{datos.resultados.length}</em> registros de un total de <em>{datos.totalResultados}</em>.</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AboutPage