import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import App from './App'
import { mainRouter } from './routes'
import store from './store'



// 深拷贝测试
// import { cloneDeep } from 'lodash'
// const state = {
//     name: 'ts',
//     roles: ['001','002','003']
// }
// 深拷贝方法一
// const newState = cloneDeep(state)
// 深拷贝方法二(不能拷贝function)
// const newState = JSON.parse(JSON.stringify(state))
// console.log(newState===state)
// newState.roles.push('007')
// console.log(state, newState)

// 深拷贝测试*****************************************************************
import { Map, List, fromJS } from 'immutable'
const newState=Map({
    name: 'ts',
    roles: ['001','002','003']
});
// 对象操作
// 取值
console.log(newState.get('name'))
// 设置值
const state2 = newState.set('name','admin');
console.log(state2.get('name'));

// 数组操作
const list1 = List([1,2,3,5]);
const list2 = list1.push(6,7);
console.log(list2.get(0));

// 对象数组组合操作
const state = {
    name: 'ts',
    roles: ['001','002','003']
}
const imState = fromJS(state)
// console.log(imState.get('roles').get(2));
// 取值
console.log(imState.getIn(['roles',1]));
console.log(imState.toJS().roles[1])
// 设置值
const imState2 = imState.setIn(['roles',1],'008');
console.log(imState2.getIn(['roles',1]));

const newState2 = imState.updateIn(['roles',2], v=>v+1);
console.log(newState2.getIn(['roles',2]))
// 深拷贝测试****************************************************************


render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path='/admin' component={App} />
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