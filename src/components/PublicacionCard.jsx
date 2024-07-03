import { usePublicacionStore } from "../hooks/usePublicacionStore";

const PublicacionCard = ({ publicacion }) => {
    const { publicacionId, titulo, descripcion, fecCreFormato3, reacciones, reaccionado } = publicacion;
    const { fotoURL, nombreUsuario } = publicacion.usuario;

    const { fnCambiarReaccionPublicacion } = usePublicacionStore();

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-12 d-flex align-items-center mt-3">
                    <img src={fotoURL} className="img-fluid rounded-circle ms-3 me-2" alt="Foto del Usuario" width={30} height={30} style={{ objectFit: 'cover' }} />
                    <div>
                        <h6 className="mb-0">@{nombreUsuario}</h6>
                        <small className="text-muted">{fecCreFormato3}</small>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card-body">
                        {
                            titulo != null && <h5 className="card-title text-primary"><em>{titulo}</em></h5>
                        }
                        <p className="card-text">{descripcion}</p>

                        <div className="d-flex align-items-center">
                            {
                                reaccionado
                                    ? <i className='bx bxs-heart bx-sm text-danger' style={{ cursor: 'pointer' }} onClick={() => fnCambiarReaccionPublicacion(publicacionId)}></i>
                                    : <i className='bx bx-heart bx-sm text-primary' style={{ cursor: 'pointer' }} onClick={() => fnCambiarReaccionPublicacion(publicacionId)}></i>
                            }
                            <span className="h6 mb-0 ms-1">{reacciones}</span>
                            <i className='bx bx-chat bx-sm text-primary ms-2'></i>
                            <i className='bx bxs-share bx-sm text-primary ms-1'></i>
                            <i className='bx bx-share bx-sm text-primary ms-1'></i>
                        </div>




                    </div>

                </div>
            </div>
        </div>
    )
}

export default PublicacionCard