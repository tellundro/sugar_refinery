import { createRouter, createWebHashHistory } from 'vue-router'
import ProjectSelectionView from '../views/ProjectSelectionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProjectSelectionView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    // TODO I need to either pass in the project dictionary (when loaded from a file, or from recent history links)
    // or preload the file into Pinia to set the initial project state
    path: '/project-home',
    name: 'project-home',
    component: () => import('../views/ProjectView.vue'),
    children: [
      {
        path: 'metadata',
        name: 'metadata',
        component: () => import('../components/ProjectMetadata.vue'),
      },
      {
        path: 'category-traits-flow-chart',
        name: 'category-traits-flow-chart',
        component: () => import('../components/ProjectTraitsFlowChart.vue')
      },
      {
        path: 'category-trait-details',
        name: 'category-trait-details',
        component: () => import('../components/ProjectTraitDetails.vue')
      },

    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
