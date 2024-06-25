import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authCheckingCredentialsRegister } from '../store/auth/authThunk';
import { limpiarErrores } from '../store/auth/authSlice';
import { useEffect } from 'react';

const SignupPage = () => {

    const { error, errores } = useSelector(state => state.auth);


    const dispatch = useDispatch();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const formOnSubmit = handleSubmit(async (values) => {
        dispatch(authCheckingCredentialsRegister(values.correo, values.clave))
    })

    useEffect(() => {
        if (error || errores) {
            const timer = setTimeout(() => {
                dispatch(limpiarErrores())
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            <div className="container-fluid animate__animated animate__fadeIn">
                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="card border-primary">
                            <div className="card-header text-center">Register EMOT App 👨‍💻</div>
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
                                    <button className="btn btn-outline-success mt-2" type="submit">
                                        Registrar
                                    </button>
                                    <p className="text-start text-info mt-2">¿Ya tienes una cuenta? <Link to="/auth/login">Ingresa</Link></p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SignupPage