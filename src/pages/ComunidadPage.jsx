import React, { useEffect } from 'react'
import { Loading } from '../components/Loading';
import { useComunidadStore } from '../hooks/useComunidadStore';

const ComunidadPage = () => {

    const { cargando, fnObtenerComunidades, comunidades } = useComunidadStore();

    useEffect(() => {
        fnObtenerComunidades();
    }, []);
    console.log(comunidades);
    if (cargando) return <Loading />

    return (
        <div className="container animate__animated animate__fadeIn">
            <h2>Crear Comunidad</h2>

            <h2 className='mt-5'>Comunidades</h2>
            <div className="row g-0">
                {
                    comunidades.map(comunidad => {
                        return <div className="col-md-4 mb-4" key={comunidad.comunidadId}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img
                                    src={comunidad.imagenUrl}
                                    className="card-img-top"
                                    alt={comunidad.nombre}
                                    style={{ width: '100%', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{comunidad.nombre}</h5>
                                    <p className="card-text">{comunidad.descripcion}</p>
                                    <p className="card-text">
                                        <strong>Restricción:</strong> {comunidad.restriccion}
                                    </p>
                                    <p className="card-text">
                                        <strong>Creada:</strong> {comunidad.fechaCreacion1}
                                        <br />
                                        <strong>Fecha:</strong> {comunidad.fechaCreacion2}
                                        <br />
                                        <strong>Hora:</strong> {comunidad.fechaCreacion3}
                                    </p>
                                    <button type='button' className="btn btn-danger">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )

}

export default ComunidadPage