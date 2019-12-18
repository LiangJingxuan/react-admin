import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { adminRouter } from './routes'
import { Frame } from './components'

const menus = adminRouter.filter(route=>route.isNav===true)

class App extends Component {
    render() {
        return (
            this.props.isLogin
            ?
            <Frame menus={menus}>
                <Switch>
                    {
                        adminRouter.map(route=>{
                            return (
                                <Route 
                                    key={route.pathname}
                                    path={route.pathname}
                                    exact={route.exact}
                                    render={
                                        (routerProps)=>{
                                            const hasPermission = route.roles.includes(this.props.roles);
                                            return hasPermission ? <route.component {...routerProps} /> : <Redirect to='/admin/noauth' />
                                        }
                                    }
                                />
                            )
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                    <Redirect to='/404' />
                </Switch>
            </Frame>
            :
            <Redirect to="/login" />
        )
    }
}
const mapState = state=>{
    return {
        isLogin: state.user.isLogin,
        roles: state.user.role
    }
}
export default connect(mapState)(App)
