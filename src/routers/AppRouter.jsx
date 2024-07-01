import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SigninPage from '../pages/SigninPage'
import SignupPage from '../pages/SignupPage'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import CategoryPage from '../pages/CategoryPage'
import ProductPage from '../pages/ProductPage'
import PageNotFound from '../ui/PageNotFound'
import AdminPage from '../pages/AdminPage'
import { Loading } from '../components/Loading'
import { useCheckUser } from '../hooks/useCheckUser'
import AboutPage from '../pages/AboutPage'
import PublicacionPage from '../pages/PublicacionPage'

const AppRouter = () => {

    const { checking } = useCheckUser()

    if (checking) return <Loading />

    return (
        <Routes>
            <Route element={<PublicRouter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/auth/login" element={<SigninPage />} />
                <Route path="/auth/register" element={<SignupPage />} />
            </Route>

            <Route element={<PrivateRouter />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/publicacion" element={<PublicacionPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    )
}

export default AppRouter