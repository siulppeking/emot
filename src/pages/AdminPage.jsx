import { useSelector } from 'react-redux'
import { usePublicacionStore } from '../hooks/usePublicacionStore';
import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import PublicacionCard from '../components/PublicacionCard';

const AdminPage = () => {

  const { ejecutandoTransaccion } = useSelector(state => state.ui);

  const { fnObtenerPublicaciones, publicaciones } = usePublicacionStore();

  useEffect(() => {
    fnObtenerPublicaciones()
  }, []);

  if (ejecutandoTransaccion) return <Loading />

  return (
    <>
      <div className='container animate__animated animate__fadeIn mt-3'>
        {
          publicaciones.map(publicacion => <PublicacionCard key={publicacion.publicacionId} publicacion={publicacion} />)
        }
      </div>

    </>

  )
}

export default AdminPage