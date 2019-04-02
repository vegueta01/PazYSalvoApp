import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('./views/Inventario.vue')
    },
    {
      path: '/estados',
      name: 'estados',
      component: () => import('./views/Estados.vue')
    },
    {
      path: '/asignacion',
      name: 'Asignación',
      component: () => import('./views/Asignacion.vue')
    },
    {
      path: '/consultas',
      name: 'Consultas',
      component: () => import('./views/Consultas.vue')
    },
    {
      path: '/devolucion',
      name: 'Devolución',
      component: () => import('./views/Devolucion.vue')
    },
    {
      path: '/empleados',
      name: 'Empleados',
      component: () => import('./views/Empleados.vue')
    },
    {
      path: '/tipo_elemento',
      name: 'Tipo equipo',
      component: () => import('./views/TipoElemento.vue')
    },
    {
      path: '/estados_tablas',
      name: 'Estados de tablas',
      component: () => import('./views/EstadosDeTablas.vue')
    },
    {
      path: '/marca_equipo',
      name: 'Marca del equipo',
      component: () => import('./views/MarcaElemento.vue')
    },
    {
      path: '/elementos',
      name: 'Elementos',
      component: () => import('./views/Elementos.vue')
    },
    {
      path: '/tipo_transaccion',
      name: 'Tipo transacción',
      component: () => import('./views/TipoTransaccion.vue')
    }

    
  ]
})
