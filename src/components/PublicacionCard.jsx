import { useEffect, useState } from "react";
import { usePublicacionStore } from "../hooks/usePublicacionStore";
import { v1PrivateApi } from "../api/v1Private.api";

const PublicacionCard = ({ publicacion }) => {
    const { publicacionId, titulo, descripcion, fecCreFormato3, reacciones, reaccionado } = publicacion;
    const { fotoURL, nombreUsuario } = publicacion.usuario;

    const { fnCambiarReaccionPublicacion } = usePublicacionStore();

    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');

    useEffect(() => {
        const obtenerComentarios = async () => {
            try {
                const response = await v1PrivateApi.get(`/comentarios/${publicacionId}`);
                setComentarios(response.data.datos);
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
            }
        }
        obtenerComentarios();
    }, [])

    const toggleComentarios = async () => {
        setMostrarComentarios(!mostrarComentarios);
        if (!mostrarComentarios && comentarios.length === 0) {

        }
    };

    const handleAgregarComentario = async () => {
        if (nuevoComentario.trim()) {
            const comentario = {
                texto: nuevoComentario
            }

            try {
                const response = await v1PrivateApi.post(`/comentarios/${publicacionId}`, comentario);
                setComentarios([response.data.datos, ...comentarios]);
                setNuevoComentario('');
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
            }
        }
    };

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
                            <i className={`bx bx${comentarios.length == 0 ? '' : 's'}-chat bx-sm text-primary ms-2`} onClick={toggleComentarios} style={{ cursor: 'pointer' }}></i>
                            <span className="h6 mb-0 ms-1">{comentarios.length}</span>
                            <i className='bx bxs-share bx-sm text-primary ms-1'></i>
                            <i className='bx bx-share bx-sm text-primary ms-1'></i>
                        </div>
                    </div>
                </div>
            </div>
            {mostrarComentarios && (
                <div className="comentarios-section animate__animated animate__fadeIn">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Añadir un comentario..."
                        />
                        <button className="btn btn-primary" title="Comentar"  onClick={handleAgregarComentario}><i class='bx bx-send'></i></button>
                    </div>
                    {comentarios.map((comentario) => (
                        <div key={comentario.comentarioId} className="comentario mb-3">

                            <div className="col-md-12 d-flex align-items-center mt-3">
                                <img src={comentario.usuario.fotoURL} className="img-fluid rounded-circle ms-3 me-2"
                                alt="Foto del Usuario"
                                width={25}
                                height={25}
                                style={{ objectFit: 'cover' }} />
                                <div>
                                    <h6 className="mb-0">@{comentario.usuario.nombreUsuario}</h6>
                                    <small className="text-muted">{comentario.fechaCreacion}</small>
                                    <p className="card-text">{comentario.texto}</p>
                                </div>
                            </div>

                            {/* <div className="subcomentarios-section ms-3">
                                {comentario.subComentarios.map((subComentario) => (
                                    <div key={subComentario._id} className="subcomentario">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="https://res.cloudinary.com/ddsphxk7g/image/upload/v1718891536/user_2_v12lg7.png"
                                                className="img-fluid rounded-circle ms-3 me-2"
                                                alt="Foto del Usuario"
                                                width="20"
                                                height="20"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div>
                                                <h6 className="mb-0">@{subComentario.autor.username}</h6>
                                                <small className="text-muted">hace {subComentario.fecha}</small>
                                            </div>
                                        </div>
                                        <p className="card-text">{subComentario.texto}</p>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PublicacionCard