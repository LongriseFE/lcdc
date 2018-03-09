import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/author/login'], resolve)
    },
    {
      path: '/logout',
      name: 'logout',
      component: resolve => require(['@/views/author/logout'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/author/register'], resolve)
    },
    {
      path: '/remember',
      name: 'remember',
      component: resolve => require(['@/views/author/remember'], resolve)
    },
    {
      path: '/pan',
      name: 'pan',
      component: resolve => require(['@/views/pan/index'], resolve)
    },
    {
      path: '/luck',
      name: 'luck',
      component: resolve => require(['@/views/luck/index'], resolve)
    },
    {
      path: '/message',
      name: 'message',
      component: resolve => require(['@/views/message/index'], resolve)
    },
    {
      path: '/project',
      name: 'project',
      redirect: '/project/all',
      component: resolve => require(['@/views/project/index'], resolve)
    },
    {
      path: '/project/:branch',
      name: 'project2',
      component: resolve => require(['@/views/project/index'], resolve)
    },
    {
      path: '/project/:branch/:category',
      name: 'project1',
      component: resolve => require(['@/views/project/index'], resolve)
    },
    {
      path: '/project/:branch/:category/:uId',
      name: 'projectInfo',
      component: resolve => require(['@/views/project/detail'], resolve)
    },
    {
      path: '/personer',
      name: 'personer',
      redirect: 'personer/info',
      component: resolve => require(['@/views/personer/index'], resolve),
      children: [{
        path: '/personer/info',
        components: {
          'content': resolve => require(['@/views/personer/info'], resolve)
        }
      }, {
        path: '/personer/message',
        components: {
          'content': resolve => require(['@/views/personer/message'], resolve)
        }
      }, {
        path: '/personer/collection',
        components: {
          'content': resolve => require(['@/views/personer/collection'], resolve)
        }
      }, {
        path: '/personer/download',
        components: {
          'content': resolve => require(['@/views/personer/download'], resolve)
        }
      }, {
        path: '/personer/phone',
        components: {
          'content': resolve => require(['@/views/personer/phone'], resolve)
        }
      }, {
        path: '/personer/email',
        components: {
          'content': resolve => require(['@/views/personer/email'], resolve)
        }
      }, {
        path: '/personer/password',
        components: {
          'content': resolve => require(['@/views/personer/password'], resolve)
        }
      }, {
        path: '/personer/face',
        components: {
          'content': resolve => require(['@/views/personer/face'], resolve)
        }
      }]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: 'admin/welcome',
      component: resolve => require(['@/views/admin/index'], resolve),
      children: [{
        path: '/admin/welcome',
        name: '/admin/welcome',
        components: {
          'admin': resolve => require(['@/views/admin/welcome'], resolve)
        }
      }, {
        path: '/admin/user',
        name: '/admin/user',
        components: {
          'admin': resolve => require(['@/views/admin/user/index'], resolve)
        }
      }, {
        path: '/admin/project',
        name: '/admin/project',
        components: {
          'admin': resolve => require(['@/views/admin/project/index'], resolve)
        }
      }, {
        path: '/admin/project/publish',
        name: '/admin/project/publish',
        components: {
          'admin': resolve => require(['@/views/admin/project/publish'], resolve)
        }
      }, {
        path: '/admin/setting',
        name: '/admin/setting',
        components: {
          'admin': resolve => require(['@/views/admin/setting/index'], resolve)
        }
      }, {
        path: '/admin/setting/department',
        name: '/admin/setting/department',
        components: {
          'admin': resolve => require(['@/views/admin/setting/department'], resolve)
        }
      }, {
        path: '/admin/setting/project',
        name: '/admin/setting/project',
        components: {
          'admin': resolve => require(['@/views/admin/setting/project'], resolve)
        }
      }, {
        path: '/admin/setting/author',
        name: '/admin/setting/author',
        components: {
          'admin': resolve => require(['@/views/admin/setting/author'], resolve)
        }
      }, {
        path: '/admin/setting/theme',
        name: '/admin/setting/theme',
        components: {
          'admin': resolve => require(['@/views/admin/setting/theme'], resolve)
        }
      }]
    }
  ]
})
