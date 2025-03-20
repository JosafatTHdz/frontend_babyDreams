import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import PublicLayout from './layouts/PublicLayout'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import HomeView from './views/HomeView'
import EditProfile from './views/EditeProfileView'
import RegisterProduct from './views/RegisterProductView'
import CategoriesView from './views/CategoriesView'
import CategoryProductsView from './views/CategoryProductsView'
import ProductDetailView from './views/ProductView'
import AdminProducts from './views/ProductAdminView'
import AboutView from './views/AboutView'
import AboutAdmin from './views/AboutAdminView'
import CunaBalanceo from './views/ControlIoTView'

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/Register' element={<RegisterView />} />
                </Route>

                <Route path='/admin' element={<MainLayout />}>
                    <Route path='profile' element={<EditProfile />} />
                    <Route path='product/register' element={<RegisterProduct />} />
                    <Route path='product/modify' element={<AdminProducts />} />
                    <Route path='about/edit' element={<AboutAdmin />} />
                    <Route path='iot/control' element={<CunaBalanceo />} />
                </Route>

                <Route element={<PublicLayout />} >
                    <Route path='/' element={<HomeView />} />
                    <Route path='/product/:productId' element={<ProductDetailView />} />
                    <Route path='/category' element={<CategoriesView />} />
                    <Route path='/category/:categoryId' element={<CategoryProductsView />} />
                    <Route path='/about' element={<AboutView />} />
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
