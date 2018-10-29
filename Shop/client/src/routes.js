import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/layout'
import Home from './components/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Register} />
                <Route path="/signin" exact component={Login} />
            </Switch>
        </Layout>
    )
}

export default Routes
