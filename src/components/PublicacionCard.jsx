import { useEffect, useState } from "react";
import { usePublicacionStore } from "../hooks/usePublicacionStore";
import { v1PrivateApi } from "../api/v1Private.api";

import e14 from '../assets/emojis/emoji_14.gif';
import e18 from '../assets/emojis/emoji_18.gif';

import e14png from '../assets/emojis/png/emoji_14_00000.png';
import e18png from '../assets/emojis/png/emoji_18_00000.png';
import emot_logo from '../assets/emot_logo.png'

const emojis = [
    { src: e14png, alt: 'emoji_14', nombre: 'Te entiendo', id: 1 },
    { src: e18png, alt: 'emoji_18', nombre: 'Te comprendo', id: 2 }
    // Puedes agregar más emojis aquí
];

const getBadgeColor = (emoción) => {
    switch (emoción) {
        case 'Enojo':
            return 'bg-danger'; // Rojo
        case 'Tristeza':
            return 'bg-secondary'; // Gris
        case 'Ansiedad':
            return 'bg-warning'; // Amarillo
        case 'Miedo':
            return 'bg-dark'; // Negro
        case 'Alegria':
            return 'bg-success'; // Verde
        case 'Amor':
            return 'bg-primary'; // Azul
        default:
            return 'bg-light'; // Default
    }
};

const PublicacionCard = ({ publicacion }) => {
    const { publicacionId, titulo, descripcion, categoria, fecCreFormato3, reacciones, reaccionado } = publicacion;
    const { fotoURL, nombreUsuario } = publicacion.usuario;

    const { fnCambiarReaccionPublicacion, fnAgregarComentario } = usePublicacionStore();

    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState('');

    const toggleComentarios = async () => {
        setMostrarComentarios(!mostrarComentarios);
        if (!mostrarComentarios && publicacion.comentarios.length === 0) {
            // Aquí podrías cargar los publicacion.comentarios desde la API si fuera necesario
        }
    };

    const handleAgregarComentario = async () => {
        if (nuevoComentario.trim()) {
            const comentario = {
                texto: nuevoComentario
            }

            try {
                const response = await v1PrivateApi.post(`/comentarios/${publicacionId}`, comentario);
                console.log(response);
                fnAgregarComentario(response.data.datos)
                setNuevoComentario('');
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
            }
        }
    };

    const handleReaccionar = async (emojiId) => {
        try {
            await fnCambiarReaccionPublicacion(publicacionId, emojiId);
        } catch (error) {
            console.error('Error al cambiar la reacción:', error);
        }
    }

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
                        <span className={`badge ${getBadgeColor(categoria)} mb-3`}>
                            {categoria}
                        </span>
                        {
                            titulo != null && <h5 className="card-title text-primary"><em>{titulo}</em></h5>
                        }
                        <p className="card-text">{descripcion}</p>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        <div className="dropdown me-2">
                            <img src={emot_logo} alt="" width={20} data-bs-toggle="dropdown" style={{ cursor: 'pointer', marginBottom: '2px' }} />
                            <ul className="dropdown-menu">
                                {emojis.map(emoji => (
                                    <li key={emoji.id}>
                                        <a className="dropdown-item" onClick={() => handleReaccionar(emoji.id)}>
                                            <img src={emoji.src} alt={emoji.alt} width={32} />{emoji.nombre}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <span className="h6 mb-0 me-1">{reacciones}</span>
                        <img src={e14png} alt="" width={32} /><span className="h6 mb-0 me-1">{reacciones}</span>
                        <img src={e18png} alt="" width={32} /><span className="h6 mb-0 me-1">{reacciones}</span>
                        {
                            reaccionado
                                ? <i className='bx bxs-heart bx-sm text-danger' style={{ cursor: 'pointer' }} onClick={() => fnCambiarReaccionPublicacion(publicacionId)}></i>
                                : <i className='bx bx-heart bx-sm text-primary' style={{ cursor: 'pointer' }} onClick={() => fnCambiarReaccionPublicacion(publicacionId)}></i>
                        }
                        <span className="h6 mb-0 ms-1">{reacciones}</span>
                        <i className={`bx bx${publicacion.comentarios.length == 0 ? '' : 's'}-chat bx-sm text-primary ms-2`} onClick={toggleComentarios} style={{ cursor: 'pointer' }}></i>
                        <span className="h6 mb-0 ms-1">{publicacion.comentarios.length}</span>
                        <i className='bx bxs-share bx-sm text-primary ms-1'></i>
                        <i className='bx bx-share bx-sm text-primary ms-1'></i>
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
                            placeholder="Comentar publicacion..."
                        />
                        <button className="btn btn-primary" title="Comentar" onClick={handleAgregarComentario}><i className='bx bx-send'></i></button>
                    </div>
                    {publicacion.comentarios.map((comentario) => (
                        <Comentario key={comentario.comentarioId} comentario={comentario} />
                    ))}
                </div>
            )}
        </div>
    )
}

const Comentario = ({ comentario }) => {

    const { fnAgregarSubComentario } = usePublicacionStore();

    const [mostrarSubComentarios, setMostrarSubComentarios] = useState(false);
    const [nuevoSubComentario, setNuevoSubComentario] = useState('');

    const toggleSubComentarios = () => {
        setMostrarSubComentarios(!mostrarSubComentarios);
    };

    const handleAgregarSubComentario = async () => {
        if (nuevoSubComentario.trim()) {
            const subComentario = {
                texto: nuevoSubComentario
            }

            try {
                const response = await v1PrivateApi.post(`/comentarios/${comentario.comentarioId}/subcomentarios`, subComentario);
                console.log(response.data.datos);
                fnAgregarSubComentario(response.data.datos)
                setNuevoSubComentario('');
            } catch (error) {
                console.error('Error al agregar el subcomentario:', error);
            }
        }
    };

    return (
        <div className="comentario mb-3">
            <div className="col-md-12 d-flex align-items-center mt-3">
                <img src={comentario.usuario.fotoURL} className="img-fluid rounded-circle ms-3 me-2"
                    alt="Foto del Usuario"
                    width={25}
                    height={25}
                    style={{ objectFit: 'cover' }} />
                <div>
                    <h6 className="mb-0">@{comentario.usuario.nombreUsuario}</h6>
                    <small className="text-muted">{comentario.fechaCreacion}</small>
                    <p className="card-text mb-0">{comentario.texto}</p>
                    <div className="d-flex align-items-center mt-1">
                        <i className='bx bx-heart text-primary' style={{ cursor: 'pointer' }}></i>
                        <span className="h6 mb-0 ms-1">{comentario.reacciones}</span>
                        <i className={`bx bx${comentario.subComentarios.length == 0 ? '' : 's'}-chat text-primary ms-2`} onClick={toggleSubComentarios} style={{ cursor: 'pointer' }}></i>
                        <span className="h6 mb-0 ms-1">{comentario.subComentarios.length}</span>
                    </div>
                </div>
            </div>
            {mostrarSubComentarios && (
                <div className="subcomentarios-section ms-3 mt-2">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={nuevoSubComentario}
                            onChange={(e) => setNuevoSubComentario(e.target.value)}
                            placeholder="Responder comentario..."
                        />
                        <button className="btn btn-primary" title="Comentar" onClick={handleAgregarSubComentario}><i className='bx bx-send'></i></button>
                    </div>
                    {comentario.subComentarios.map((subComentario) => (
                        <div key={subComentario.comentarioId} className="subcomentario ms-4">
                            <div className="d-flex align-items-center">
                                <img
                                    src={subComentario.usuario.fotoURL}
                                    className="img-fluid rounded-circle ms-3 me-2"
                                    alt="Foto del Usuario"
                                    width="20"
                                    height="20"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <h6 className="mb-0">@{subComentario.usuario.nombreUsuario}</h6>
                                    <small className="text-muted">{subComentario.fechaCreacion}</small>
                                    <p className="card-text mb-0">{subComentario.texto}</p>
                                    <div className="d-flex align-items-center mt-1">
                                        <i className='bx bx-heart text-primary' style={{ cursor: 'pointer' }}></i>
                                        <span className="h6 mb-0 ms-1">{subComentario.reacciones}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PublicacionCard;
