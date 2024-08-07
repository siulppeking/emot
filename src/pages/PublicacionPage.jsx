import React, { useEffect } from 'react'
import { usePublicacionStore } from '../hooks/usePublicacionStore';
import { Loading } from '../components/Loading';
import { useForm } from 'react-hook-form';
import PublicacionCard from '../components/PublicacionCard';

const PublicacionPage = () => {

    const { cargando, fnObtenerPublicaciones, publicaciones, fnCrearPublicacion } = usePublicacionStore();

    const { register, reset, handleSubmit, formState: {
        errors
    } } = useForm();

    const formOnSubmit = handleSubmit(async (values) => {
        fnCrearPublicacion(values.titulo, values.descripcion);
        reset();
    })

    useEffect(() => {
        fnObtenerPublicaciones()
    }, []);

    if (cargando) return <Loading />

    return (
        <div className="container animate__animated animate__fadeIn">
            <h2>Crear Publicación</h2>
            <form onSubmit={formOnSubmit}>
                <div className="mb-3">
                    <input type="text" name='titulo' className="form-control"
                        autoComplete='off'
                        placeholder="Ingrese el título de la publicación"
                        {...register('titulo')}
                    />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name='descripcion' rows="6"
                        placeholder="Ingrese la descripción de la publicación"
                        {...register('descripcion', { required: true })}
                    ></textarea>
                    {errors.descripcion && <p className='text-danger'>La descripcion es requerida</p>}
                </div>
                <button type="submit" className="btn btn-primary">Publicar</button>
            </form>
            <h2 className='mt-5'>Publicaciones</h2>
            {
                publicaciones.map(publicacion => <PublicacionCard key={publicacion.publicacionId} publicacion={publicacion} />)
            }

        </div>
    )
}

export default PublicacionPage