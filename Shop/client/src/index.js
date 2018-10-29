import React from 'react'
import ReactDOM from 'react-dom'
import './Resources/css/styles.css'

// Routing
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import Reducer from './redux/reducers'

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk
)(createStore)

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            // @descr: Chrome extension
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
