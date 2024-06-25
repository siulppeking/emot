import { useDispatch, useSelector } from 'react-redux'
import { thunkObtenerProductos } from '../store/productos/productoThunk'
import { useEffect } from 'react'
import { Loading } from '../components/Loading'

const ProductPage = () => {

  const { ejecutandoTransaccion, mensajeError, productos } = useSelector(state => state.producto);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkObtenerProductos());
  }, [])

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2>ProductPage</h2>
      <hr />
      {(!ejecutandoTransaccion && mensajeError) && <div className='alert alert-danger'>Listar productos: {mensajeError}</div>}
      <hr />
      <div className='table-responsive'>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th className='text-center'>NOMBRE</th>
              <th className='text-center'>DESCRIPCION</th>
              <th className='text-center'>PRECIO (S/.)</th>
              <th className='text-center'>DISPONIBLE</th>
              <th className='text-center'>FECHA DE CREACION</th>
            </tr>
          </thead>
          <tbody>
            {
              productos.map(producto => (
                <tr key={producto.productId}>
                  <td className='text-center'>{producto.productId}</td>
                  <td className='text-start'>{producto.name}</td>
                  <td className='text-start'>{producto.description}</td>
                  <td className='text-center'>{producto.price}</td>
                  <td className='text-center'>{producto.available ? 'DISPONIBLE' : 'NO DISPONIBLE'}</td>
                  <td className='text-center'>{producto.createdAt}</td>
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

export default ProductPage