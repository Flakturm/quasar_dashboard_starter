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
    redirect: '/users/members',
    component: DashboardLayout,
    meta: {
      title: '用戶管理',
      icon: 'fas fa-users',
      root: true,
      children: true
    },
    children: [
      {
        path: 'members',
        name: 'users.members',
        component: () => import('pages/users'),
        meta: {
          title: '會員',
          permissions: ['access users.members']
        }
      },
      {
        path: 'vendors',
        name: 'users.vendors',
        component: () => import('pages/users'),
        meta: {
          title: '經銷商',
          permissions: ['access users.vendors']
        }
      },
      {
        path: 'admin',
        name: 'users.admin',
        component: () => import('pages/users'),
        meta: {
          title: '管理員',
          permissions: ['access users.admin']
        }
      },
      {
        path: 'roles',
        name: 'users.roles',
        component: () => import('pages/users/roles'),
        meta: {
          title: '權限管理',
          permissions: ['access users.permissions']
        }
      },
      {
        path: 'roles/new',
        name: 'users.roles.add',
        component: () => import('pages/users/roles/Add'),
        meta: {
          title: '新增角色',
          permissions: ['access users.permissions'],
          hidden: true
        }
      },
      {
        path: 'roles/:id',
        name: 'users.roles.edit',
        component: () => import('pages/users/roles/Edit'),
        meta: {
          title: '編輯角色',
          permissions: ['access users.permissions'],
          hidden: true
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
