
import './App.css';
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import RegisterScreen from './screens/UserRegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/' element={<HomeScreen/>} exact />
          <Route path='/login' element={<UserLoginScreen/>} />
          <Route path='/shipping' element={<ShippingScreen/>} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/admin/orderlist' element={<OrderListScreen/>} />
          <Route path='/product/:id' element={<ProductScreen/>} />
          <Route
            path='/admin/productlist/:pageNumber'
            element={<ProductListScreen/>}
            exact
          />
          <Route path='/cart/:id' element={<CartScreen/>} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
          <Route path='/admin/userlist' element={<UserListScreen/>} />
          <Route path='/admin/productlist' element={<ProductListScreen/>} exact />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
          <Route path='/search/:keyword' element={<HomeScreen/>} exact />
          <Route path='/page/:pageNumber' element={<HomeScreen/>} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<HomeScreen/>}
            exact
          />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
