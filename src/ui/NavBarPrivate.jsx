import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BotonLogoutGoogle from '../components/BotonLogoutGoogle';
import svg from '../assets/emot_logo.png';

const NavBarPrivate = () => {

    const { nombreUsuario, fotoURL } = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <NavLink to='/admin' className="navbar-brand">
                    <img src={svg} alt="logo-emot" border="0" width={40} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/publicacion'>Publicaciones</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" style={{ alignItems: 'center' }}>
                        <span className='text-primary' style={{ margin: '7px 5px 0 0' }}><strong>@{nombreUsuario}</strong></span>
                        <img src={fotoURL} className="img-fluid rounded-circle ms-1 me-2" alt="Foto del Usuario" style={{ objectFit: 'cover', width: '35px', height: '35px' }} />
                        <BotonLogoutGoogle />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavBarPrivate