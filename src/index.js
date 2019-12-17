import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import App from './App'
import { mainRouter } from './routes'
import store from './store'


render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path='/admin' render={
                        (routerProps)=>{
                            return <App {...routerProps} />
                        }
                    } />
                    {
                        mainRouter.map(route=>{
                            return (
                                <Route 
                                    key={route.pathname}
                                    path={route.pathname}
                                    component={route.component}    
                                />
                            )
                        })
                    }
                    <Redirect to='/admin' from='/' exact />
                    <Redirect to='/404' />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
);