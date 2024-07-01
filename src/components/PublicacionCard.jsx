const PublicacionCard = ({ publicacion }) => {
    const { titulo, descripcion, fecCreFormato3 } = publicacion;
    const { fotoURL, nombreUsuario } = publicacion.usuario;
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

                        <i className='bx bxs-heart bx-sm text-primary'></i>
                        <i className='bx bx-heart bx-sm text-primary ms-1'></i>
                        <i className='bx bx-chat bx-sm text-primary ms-1'></i>
                        <i className='bx bxs-share bx-sm text-primary ms-1'></i>
                        <i className='bx bx-share bx-sm text-primary ms-1'></i>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PublicacionCard