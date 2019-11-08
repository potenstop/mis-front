/**
 *
 * 功能描述:
 *
 * @className ConfigRouter
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 17:07
 */
import Main from '@/components/overall/Main.vue'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
  {
    path: '/401',
    name: 'Error401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/401.vue')
  },
  {
    path: '/500',
    name: 'Error500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/500.vue')
  },
  {
    path: '*',
    name: 'Error404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    meta: {
      title: '{{ LOGIN }}',
      hideInMenu: true
    },
    component: () => import('@/views/login/UserLogin.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/overview',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/overview',
        name: 'OverviewHome',
        meta: {
          hideInMenu: true,
          title: '{{ OVERVIEW }}',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/home/OverviewHome.vue')
      }
    ]
  },
  {
    path: '/logger',
    name: 'Logger',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'error',
        name: 'ErrorLogger',
        meta: {
          icon: 'ios-bug',
          title: '{{ ERROR_LOGGER_COLLECT }}'
        },
        component: () => import('@/views/logger/ErrorLogger.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      icon: 'ios-contact-outline',
      title: '{{ USER_MANAGE }}'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'UserList',
        meta: {
          icon: 'ios-people-outline',
          title: '{{ USER_DATA_LIST }}'
        },
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: 'edit',
        name: 'UserEdit',
        meta: {
          hideInMenu: true,
          icon: 'ios-people-outline',
          title: '{{ USER_EDIT }}'
        },
        component: () => import('@/views/user/UserEdit.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      icon: 'logo-hackernews',
      title: '{{ NEWS_MANAGE }}'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'NewsList',
        meta: {
          icon: 'logo-hackernews',
          title: '{{ NEWS_LIST }}'
        },
        component: () => import('@/views/news/NewsList.vue')
      },
      {
        path: 'edit',
        name: 'NewsEdit',
        meta: {
          hideInMenu: true,
          icon: 'ios-people-outline',
          title: '{{ NEWS_EDIT }}'
        },
        component: () => import('@/views/news/NewsEdit.vue')
      }
    ]
  },
  {
    path: '/course',
    name: 'Course',
    meta: {
      icon: 'logo-hackernews',
      title: '{{ COURSE_MANAGE }}'
    },
    component: Main,
    children: [
      {
        path: 'album/list',
        name: 'CourseAlbumList',
        meta: {
          icon: 'logo-hackernews',
          title: '{{ COURSE_ALBUM_LIST }}'
        },
        component: () => import('@/views/course/album/CourseAlbumList.vue')
      },
      {
        path: 'album/add',
        name: 'CourseAlbumAdd',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_ALBUM_ADD }}'
        },
        component: () => import('@/views/course/album/CourseAlbumEdit.vue')
      },
      {
        path: 'album/edit',
        name: 'CourseAlbumEdit',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_ALBUM_EDIT }}'
        },
        component: () => import('@/views/course/album/CourseAlbumEdit.vue')
      },
      {
        path: 'subject/list',
        name: 'CourseSubjectList',
        meta: {
          icon: 'logo-hackernews',
          title: '{{ COURSE_SUBJECT_LIST }}'
        },
        component: () => import('@/views/course/subject/CourseSubjectList.vue')
      },
      {
        path: 'subject/add',
        name: 'CourseSubjectAdd',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_SUBJECT_ADD }}'
        },
        component: () => import('@/views/course/subject/CourseSubjectEdit.vue')
      },
      {
        path: 'subject/edit',
        name: 'CourseSubjectEdit',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_SUBJECT_EDIT }}'
        },
        component: () => import('@/views/course/subject/CourseSubjectEdit.vue')
      },
      {
        path: 'topic/list',
        name: 'CourseTopicList',
        meta: {
          icon: 'logo-hackernews',
          title: '{{ COURSE_TOPIC_LIST }}'
        },
        component: () => import('@/views/course/topic/CourseTopicList.vue')
      },
      {
        path: 'topic/add',
        name: 'CourseTopicAdd',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_TOPIC_ADD }}'
        },
        component: () => import('@/views/course/topic/CourseTopicEdit.vue')
      },
      {
        path: 'topic/edit',
        name: 'CourseTopicEdit',
        meta: {
          hideInMenu: true,
          icon: 'logo-hackernews',
          title: '{{ COURSE_TOPIC_EDIT }}'
        },
        component: () => import('@/views/course/topic/CourseTopicEdit.vue')
      }
    ]
  }
]
