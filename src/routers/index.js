import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes = [
    {
        path: '/',
        meta: {
            swiper: true
        },
        redirect: '/p4'
    },
    {
        path: '/p4',
        name: 'p4',
        meta: {
            swiper: true
        },
        component: require('@/pages/p4').default,
    },
    {
        path: '/p1',
        name: 'p1',
        meta: {
            swiper: true
        },
        component: require('@/pages/p1').default,
    },
    {
        path: '/p2',
        name: 'p2',
        meta: {
            swiper: true
        },
        component: require('@/pages/p2').default,
    },
    {
        path: '/p3',
        name: 'p3',
        meta: {
            swiper: true
        },
        component: require('@/pages/p3').default,
    },
    {
        path: '/nav',
        name: 'nav',
        meta: {
            swiper: true
        },
        component: require('@/pages/nav/nav').default,
    },
    {
        path: '/n1',
        name: 'n1',
        meta: {
            swiper: false
        },
        component: require('@/pages/nav/n1/index').default,
    },
    {
        path: '/n2',
        name: 'n2',
        meta: {
            swiper: false
        },
        component: require('@/pages/nav/n2/index').default,
    },
    {
        path: '/n3',
        name: 'n3',
        meta: {
            swiper: false
        },
        component: require('@/pages/nav/n3/index').default,
    },
    {
        path: '/n4',
        name: 'n4',
        meta: {
            swiper: false
        },
        component: require('@/pages/nav/n4/index').default,
    },
    {
        path: '/n5',
        name: 'n5',
        meta: {
            swiper: false
        },
        component: require('@/pages/nav/n5/index').default,
    },
    {
        path: '/edit',
        name: 'edit',
        meta: {
            swiper: false
        },
        component: require('@/pages/edit').default,
    },
    {
        path: '/print',
        name: 'print',
        meta: {
            swiper: false
        },
        component: require('@/pages/print').default,
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
