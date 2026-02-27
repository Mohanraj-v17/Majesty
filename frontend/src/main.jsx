
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import HomeScreen from './pages/HomeScreen.jsx';
import CartScreen from './pages/CartScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import ProductScreen from './pages/ProductScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import EditProfileScreen from './pages/EditScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ShippingScreen from './pages/ShippingScreen.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import PlaceOrderScreen from './pages/PlaceOrderScreen.jsx';
import OrderScreen from './pages/OrderScreen.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/profile/edit' element={<EditProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />

        </Route>
    )
)
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
)
