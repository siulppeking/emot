import { useEffect } from 'react';
import { usePublicacionStore } from '../hooks/usePublicacionStore';
import { Loading } from '../components/Loading';
import PublicacionCard from '../components/PublicacionCard';

const AdminPage = () => {
  const { cargando, fnObtenerPublicaciones, publicaciones } = usePublicacionStore();

  useEffect(() => {
    fnObtenerPublicaciones()
  }, []);

  if (cargando) return <Loading />

  return (
    <div className='container animate__animated animate__fadeIn mt-3'>
      {
        publicaciones.map(publicacion => <PublicacionCard key={publicacion.publicacionId} publicacion={publicacion} />)
      }
    </div>
  )
}

export default AdminPage