import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import BotonLoginGoogle from './BotonLoginGoogle';
import { authCheckingCredentials } from '../store/auth/authThunk';
import { limpiarErrores } from '../store/auth/authSlice';

const SigninPage = () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const { status, checking, errorMessage, error, errores } = useSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (status == 'authenticated' && !checking) {

            const lastPath = localStorage.getItem('lastPath') || '/admin';
            navigate(lastPath, {
                replace: true
            })

            //navigate('/admin', { replace: true });
        }
    }, [status])

    const formOnSubmit = handleSubmit(async (values) => {
        dispatch(authCheckingCredentials(values.correo, values.clave));
    });

    useEffect(() => {
        if (error || errores) {
            const timer = setTimeout(() => {
                dispatch(limpiarErrores())
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

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
                                    {...register('correo'/* , { required: true } */)}
                                />
                                {errors.correo && <p className='text-danger'>Correo es requerido</p>}
                                <input type="password"
                                    className="form-control mt-2"
                                    placeholder="Password"
                                    {...register('clave'/* , { required: true } */)}
                                />
                                {errors.clave && <p className='text-danger'>Clave es requerida</p>}
                                <button className="btn btn-outline-success mt-2" type="submit" disabled={checking}>
                                    Ingresar
                                </button>
                                <Link to={'/'} className="btn btn-outline-warning mt-2 ms-2">
                                    Home
                                </Link>
                                <p className="text-start text-info mt-2">
                                    ¿No tienes una cuenta? <Link to="/auth/register" disabled={checking}>Registrate</Link>
                                </p>
                                <BotonLoginGoogle />
                            </form>

                        </div>
                    </div>


                </div>
            </div>
            {
                status === 'checking' && <Loading />
            }
        </div>
    )
}

export default SigninPage