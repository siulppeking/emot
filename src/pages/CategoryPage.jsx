import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BotonLogoutGoogle from './BotonLogoutGoogle'
import { Loading } from '../components/Loading'
import { thunkObtenerCategorias } from '../store/categoria/categoriaThunk'
import { useEffect } from 'react'

const CategoryPage = () => {

  const { name, username, email } = useSelector(state => state.auth);

  const { ejecutandoTransaccion, categorias, mensajeError } = useSelector(state => state.categoria);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkObtenerCategorias());
  }, [])

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2>CategoryPage</h2>
      <hr />
      {(!ejecutandoTransaccion && mensajeError) && <div className='alert alert-danger'>Listar categorias: {mensajeError}</div>}
      <hr />
      <div className='table-responsive'>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th className='text-center'>NOMBRE</th>
              <th className='text-center'>DESCRIPCION</th>
              <th className='text-center'>FECHA DE CREACION</th>
              <th className='text-center'>HORA DE CREACION</th>
            </tr>
          </thead>
          <tbody>
            {
              categorias.map(categoria => (
                <tr key={categoria.categoryId}>
                  <td className='text-center'>{categoria.categoryId}</td>
                  <td className='text-start'>{categoria.name}</td>
                  <td className='text-start'>{categoria.description}</td>
                  <td className='text-center'>{categoria.dateAt}</td>
                  <td className='text-center'>{categoria.hourAt}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


      {ejecutandoTransaccion && <Loading />}
    </div>
  )
}

export default CategoryPage