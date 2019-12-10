import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import App from './App'
import { mainRouter } from './routes'

render(
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
    </ConfigProvider>,
    document.querySelector('#root')
);