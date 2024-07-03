import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthLoginPage from '../pages/AuthLoginPage'
import AuthRegistroPage from '../pages/AuthRegistroPage'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import PageNotFound from '../ui/PageNotFound'
import AdminPage from '../pages/AdminPage'
import { Loading } from '../components/Loading'
import { useCheckUser } from '../hooks/useCheckUser'
import AboutPage from '../pages/AboutPage'
import PublicacionPage from '../pages/PublicacionPage'

const AppRouter = () => {

    const { cargando } = useCheckUser();

    if (cargando) return <Loading />

    return (
        <Routes>
            <Route element={<PublicRouter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/registro" element={<AuthRegistroPage />} />
            </Route>

            <Route element={<PrivateRouter />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/publicacion" element={<PublicacionPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    )
}

export default AppRouter