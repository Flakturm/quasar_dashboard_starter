import DashboardLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/services/user-password-auth/pages/Login')
  },

  {
    path: '/',
    redirect: '/',
    name: 'dashboard',
    component: DashboardLayout,
    meta: {
      title: '總覽',
      icon: 'fas fa-chart-bar',
      root: true,
      children: false
    },
    children: [
      {
        path: '',
        name: 'dashboard.home',
        component: () => import('pages'),
        meta: {
          title: '總覽'
        }
      }
    ]
  },
  // dashboard users
  {
    path: '/users',
    name: 'users',
    redirect: '/users',
    component: DashboardLayout,
    meta: {
      title: '用戶',
      icon: 'fas fa-users',
      root: true,
      children: true
    },
    children: [
      {
        path: '',
        name: 'users.members',
        component: () => import('pages/users'),
        meta: {
          title: '一般用戶'
        }
      },
      {
        path: 'admin',
        name: 'users.admin',
        component: () => import('pages/users'),
        meta: {
          title: '後台管理者',
          roles: ['admin']
        }
      },
      {
        path: 'permissions',
        name: 'users.permissions',
        component: () => import('pages/users/Permissions'),
        meta: {
          title: '後台管理權限',
          permissions: ['manage permissions']
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404')
  }
]

export default routes
