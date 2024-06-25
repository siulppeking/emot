import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRouter = () => {
    //const { pathname, search } = useLocation();
    //const lastPath = pathname + search;
    //localStorage.setItem('lastPath', lastPath);

    console.log('PublicRouter');
    //const { status, checking } = useSelector(state => state.auth);

    //if (status == 'authenticated' && !checking) return <Navigate to="/admin" replace />;

    {/* <NavbarPublic /> */ }
    return <Outlet />;

}

export default PublicRouter