import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AboutPage from '../views/AboutPage.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginPage from '../views/LoginPage.vue'
import ApiPlayground from '../views/ApiPlayground.vue'
import StatusPage from '../views/StatusPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'
import TermsPage from '../views/TermsPage.vue'
import WhatWeDoPage from '../views/WhatWeDoPage.vue'
import OurWorkPage from '../views/OurWorkPage.vue'
import PricingPage from '../views/PricingPage.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/what-we-do',
    name: 'WhatWeDo',
    component: WhatWeDoPage
  },
  {
    path: '/our-work',
    name: 'OurWork',
    component: OurWorkPage
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/app',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/playground',
    name: 'ApiPlayground',
    component: ApiPlayground
  },
  {
    path: '/status',
    name: 'Status',
    component: StatusPage
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPage
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 