import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'

import Shop from './components/shop/Shop'
import Product from './components/product/Product'

import Cart from './components/cart/Cart'

import UserInformation from './components/dashboard/UserInformation'
import UserEdit from './components/dashboard/UserEdit'
import AddProduct from './components/dashboard/admin/AddProduct'
import DeleteProduct from './components/dashboard/admin/DeleteProduct'
import AllProducts from './components/dashboard/admin/AllProducts'
import ManageBrands from './components/dashboard/admin/ManageBrands'
import ManageCategories from './components/dashboard/admin/ManageCategories'

import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'

import './App.css'

// check JWT
if (localStorage.jwtToken) {
	// Set auth token header
	setAuthToken(localStorage.jwtToken)
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken)
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded))

	// If token expired
	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser())

		// Clear Profile
		store.dispatch(clearCurrentProfile())

		// Redirect
		window.location.href = '/signin'
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<div className="page_container">
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/signup" component={Register} />
								<Route exact path="/signin" component={Login} />
								<Route
									exact
									path="/password-forget"
									component={ForgetPassword}
								/>
								<Route
									exact
									path="/password-reset/:hash"
									component={ResetPassword}
								/>
								<Route exact path="/shop" component={Shop} />
								<Route exact path="/product/:id" component={Product} />
								<Route exact path="/profiles" component={Profiles} />
								<Route exact path="/profile/:handle" component={Profile} />

								<PrivateRoute exact path="/user/cart" component={Cart} />

								<PrivateRoute
									exact
									path="/user/dashboard"
									component={UserInformation}
								/>
								<PrivateRoute exact path="/user/edit" component={UserEdit} />
								<PrivateRoute
									exact
									path="/user/admin/products"
									component={AllProducts}
								/>
								<PrivateRoute
									exact
									path="/user/admin/products/add"
									component={AddProduct}
								/>
								<PrivateRoute
									exact
									path="/user/admin/products/delete"
									component={DeleteProduct}
								/>
								<PrivateRoute
									exact
									path="/user/admin/brands"
									component={ManageBrands}
								/>
								<PrivateRoute
									exact
									path="/user/admin/categories"
									component={ManageCategories}
								/>
								<Route component={NotFound} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
