// import Login from './Login'
// import NotFound from './NotFound'
// import Home from './Home'
// import User from './User'
// import NewsList from './News'
// import NewsEdit from './News/NewsEdit'

import loadable from 'react-loadable'
import { Loading } from '../components'

const Login = loadable({
    loader: ()=>import('./Login'),
    loading: Loading
})
const NotFound = loadable({
    loader: ()=>import('./NotFound'),
    loading: Loading
})
const Home = loadable({
    loader: ()=>import('./Home'),
    loading: Loading
})
const User = loadable({
    loader: ()=>import('./User'),
    loading: Loading
})
const NewsList = loadable({
    loader: ()=>import('./News'),
    loading: Loading
})
const NewsEdit = loadable({
    loader: ()=>import('./News/NewsEdit'),
    loading: Loading
})
const Notifications = loadable({
    loader: ()=>import('./Notifications'),
    loading: Loading
})
const NoAuth = loadable({
    loader: ()=>import('./NoAuth'),
    loading: Loading
})
const Profile = loadable({
    loader: ()=>import('./Profile'),
    loading: Loading
})
const ImmuTableTest = loadable({
    loader: ()=>import('./ImmutableTest'),
    loading: Loading
})

export {
    Login,
    NotFound,
    Home,
    User,
    NewsList,
    NewsEdit,
    Notifications,
    NoAuth,
    Profile,
    ImmuTableTest
}