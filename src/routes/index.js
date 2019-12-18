import {
    Login,
    NotFound,
    Home,
    User,
    NewsList,
    NewsEdit,
    Notifications,
    Profile,
    NoAuth
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
        icon: 'home',
        roles: ['001','002','003']
    },
    {
        pathname: '/admin/user',
        component: User,
        title: '用户',
        isNav: true,
        icon: 'smile',
        roles: ['001']
    },
    {
        pathname: '/admin/newslist',
        component: NewsList,
        title: '公告',
        isNav: true,
        icon: 'notification',
        exact: true,
        roles: ['001','002']
    },
    {
        pathname: '/admin/newslist/enwsedit/:id',
        component: NewsEdit,
        title: '编辑公告',
        isNav: false,
        roles: ['001']
    },
    {
        pathname: '/admin/notifications',
        component: Notifications,
        title: '通知中心',
        isNav: false,
        roles: ['001','002','003']
    },
    {
        pathname: '/admin/profile',
        component: Profile,
        title: '个人设置',
        isNav: false,
        roles: ['001','002','003']
    },
    {
        pathname: '/admin/noauth',
        component: NoAuth,
        title: '无权访问',
        isNav: false,
        roles: ['001','002','003']
    },
]