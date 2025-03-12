import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import HomeView from './views/HomeView'
import EditProfile from './views/EditeProfileView'
import RegisterProduct from './views/RegisterProductView'

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
                </Route>

                <Route path='/' element={<HomeView />} >
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
