import {AppContainer} from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

import './globalStyles.css'

import App from './App'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById( 'root' )
    )
}

render( App )

module.hot.accept( './App', () => {
    const NextApp = require( './App' ).default
    render( NextApp, document.getElementById( 'root' ) )
})
