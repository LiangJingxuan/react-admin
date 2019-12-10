import {
    Login,
    NotFound,
    Home,
    User,
    NewsList,
    NewsEdit
} from '../views'

export const mainRouter = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname: '/404',
        component: NotFound
    }
];

export const adminRouter = [
    {
        pathname: '/admin/home',
        component: Home,
        title: '首页',
        isNav: true,
        icon: 'home'
    },
    {
        pathname: '/admin/user',
        component: User,
        title: '用户',
        isNav: true,
        icon: 'smile'
    },
    {
        pathname: '/admin/newslist',
        component: NewsList,
        title: '公告',
        isNav: true,
        icon: 'notification',
        exact: true
    },
    {
        pathname: '/admin/enwsedit',
        component: NewsEdit,
        title: '编辑公告',
        icon: 'edit',
        isNav: false
    }
]