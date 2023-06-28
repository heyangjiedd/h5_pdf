import { createRouter, createWebHashHistory } from 'vue-router'


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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
