import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SingInScreen from './screens/SingInScreen';

function App() {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const userSignIn = useSelector(state => state.userSignIn)
  const {userInfo} = userSignIn

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signOut())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">Amazon</Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}
            </Link>
            {userInfo 
              ? <div className='dropdown'>
                  <Link to='#'>{userInfo.name} <i className="fas fas-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </div> 
              : <Link to="/signin">Sign In</Link>}
          </div>
        </header>
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/signin' component={SingInScreen} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      </BrowserRouter>
  );
}

export default App;
