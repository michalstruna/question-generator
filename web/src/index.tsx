import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import { App, Store } from './Core'
import { History, Url } from './Routing'
import { HomeView } from './Generator'

ReactDOM.render(
    <Provider store={Store}>
        <Router history={History}>
            <App>
                <Switch>
                    <Route exact path={Url.HOME} component={HomeView} />
                    <Redirect to={Url.HOME} />
                </Switch>
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

serviceWorker.unregister()
