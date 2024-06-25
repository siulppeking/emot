import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import BotonLogoutGoogle from '../pages/BotonLogoutGoogle';
import svg from '../assets/vite.svg';

const NavBarPrivate = () => {

    const { nombreUsuario } = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <NavLink to='/admin' className="navbar-brand">
                    <img src={svg} alt="logo-emot" border="0" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/category'>Categoria</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/product'>Producto</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <span className='text-success' style={{ margin: '7px 7px 0 0' }}><strong>@{nombreUsuario}</strong></span>
                        <BotonLogoutGoogle />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavBarPrivate