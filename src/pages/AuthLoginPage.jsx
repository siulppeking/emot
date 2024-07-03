import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import BotonLoginGoogle from '../components/BotonLoginGoogle';
import { Loading } from '../components/Loading';

const AuthLoginPage = () => {

    const { fnLogin, fnLimpiarErrores, status, cargando, error, errores } = useAuthStore();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        if (status == 'authenticated' && !cargando) {
            const lastPath = localStorage.getItem('lastPath') || '/admin';
            navigate(lastPath, {
                replace: true
            })
        }
    }, [status])

    const formOnSubmit = handleSubmit(async (values) => {
        const { correo, clave } = values;
        fnLogin(correo, clave)
    });

    useEffect(() => {
        if (error || errores) {
            const timer = setTimeout(() => {
                fnLimpiarErrores()
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, errores]);

    return (
        <div className="container-fluid animate__animated animate__fadeIn">
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card border-primary">
                        <div className="card-header text-center">Login Emot App </div>
                        <div className="card-body">
                            {
                                error && <div className="alert alert-danger" role="alert">{error}</div>
                            }
                            {
                                errores &&
                                errores.map(error => <div key={error.msg} className="alert alert-danger" role="alert">{error.msg}</div>)
                            }
                            <form onSubmit={formOnSubmit} >
                                <input type="email"
                                    className="form-control mt-2"
                                    placeholder="Email Address"
                                    autoComplete="off"
                                    {...register('correo', { required: true })}
                                />
                                {errors.correo && <p className='text-danger'>Correo es requerido</p>}
                                <input type="password"
                                    className="form-control mt-2"
                                    placeholder="Password"
                                    {...register('clave', { required: true })}
                                />
                                {errors.clave && <p className='text-danger'>Clave es requerida</p>}
                                <button className="btn btn-outline-success mt-2" type="submit" disabled={cargando}>
                                    Ingresar
                                </button>
                                <Link to={'/'} className="btn btn-outline-warning mt-2 ms-2">
                                    Home
                                </Link>
                                <p className="text-start text-info mt-2">
                                    ¿No tienes una cuenta? <Link to="/registro" disabled={cargando}>Registrate</Link>
                                </p>
                                <BotonLoginGoogle />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {
                cargando && <Loading />
            }
        </div>
    )
}

export default AuthLoginPage