import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import PublicLayout from './layouts/PublicLayout'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import HomeView from './views/ProductsView'
import EditProfile from './views/EditeProfileView'
import RegisterProduct from './views/RegisterProductView'
import CategoriesView from './views/CategoriesView'
import CategoryProductsView from './views/CategoryProductsView'
import ProductDetailView from './views/ProductView'
import AdminProducts from './views/ProductAdminView'
import AboutView from './views/AboutView'
import AboutAdmin from './views/AboutAdminView'
import CunaBalanceo from './views/ControlIoTView'
import FaQView from './views/FAQView'
import FAQAdmin from './views/FAQAdmin'
import PoliticasPrivacidad from './views/PoliciesView'
import TerminosCondiciones from './views/TermsNConditions'
import AdminPoliPage from './views/PoliciesAdminView'
import AdminTerms from './views/TermsNConditionAdminView'
import MisDispositivos from './views/DevicesView'
import Contacto from './views/ContactoView'
import Welcome from './views/HomeView'
import EditProduct from './views/EditProductView'

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
                    <Route path='product/edit/:id' element={<EditProduct />} />
                    <Route path='about/edit' element={<AboutAdmin />} />
                    <Route path='control/:deviceId' element={<CunaBalanceo />} />
                    <Route path='faq' element={<FAQAdmin />} />
                    <Route path='policies' element={<AdminPoliPage />} />
                    <Route path='terms' element={<AdminTerms />} />
                    <Route path='device' element={<MisDispositivos />} />
                </Route>

                <Route element={<PublicLayout />} >
                    <Route path='/' element={<Welcome />} />
                    <Route path='/products' element={<HomeView />} />
                    <Route path='/product/:productId' element={<ProductDetailView />} />
                    <Route path='/category' element={<CategoriesView />} />
                    <Route path='/category/:categoryId' element={<CategoryProductsView />} />
                    <Route path='/about' element={<AboutView />} />
                    <Route path='/faq' element={<FaQView />} />
                    <Route path='/Policies' element={<PoliticasPrivacidad />} />
                    <Route path='/terms' element={<TerminosCondiciones />} />
                    <Route path='/contact' element={<Contacto />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
