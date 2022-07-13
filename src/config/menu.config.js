export default [
    {
      id: '0',
      lable: '题库管理',
      meta:{
          icon:'el-icon-setting'
      },
      checked:false,
      children: [
        {
          id: '11',
          lable: '题库管理',
          path: '/manage', //
          name:'manage',
          component: () => import(/* webpackChunkName: "manage" */ '../views/question/ManageView.vue')
        },
        {
          id: '12',
          lable: 'HTML题库',
          path:'/htmlmanage', //
          name:'htmlmanage', 
          component: () => import(/* webpackChunkName: "htmlmanage" */ '../views/question/HtmlManageView.vue')
        },
        {
          id: '13',
          lable: 'JS题库',  //
          path: '/about',
          name:'about',
          component: () => import(/* webpackChunkName: "about" */ '../views/question/AboutView.vue')
        },
        {
          id: '1',
          lable: 'CSS题库', //
          path:'/cssmanage',
          name:'cssmanage',
          component: () => import(/* webpackChunkName: 'cssmanage' */ '../views/question/CssManageView.vue')
        },
        {
          id: '15',
          lable: '匹配比赛',
          path:'/competition',
          name:'competition',
          component: () => import(/* webpackChunkName: "competition" */ '../views/question/CompetitionView.vue')
        },
      ],
    },
    {
      id: '00',
      lable: '角色管理',
      meta:{
        icon:'el-icon-user'
    },
      checked:false,
      children:[{
         id: '21',
         lable: '权限管理',
         path: '/management',//
         name:'management',
         component: () => import(/* webpackChunkName: "management" */ '../views/usermanagement/ManagementView.vue')
    },{
         id: '22',
         lable: '权限配置',   //
         path: '/permissionmanagement',
         name:'permissionmanagement',
         component: () => import(/* webpackChunkName: "permissionmanagement" */ '../views/usermanagement/PermissionManagementView.vue')
    },{
      id: '23',
      lable: '创建角色',  //
      path: '/usermanagement',
      name:'usermanagement',
      component: () => import(/* webpackChunkName: "usermanagement" */ '../views/usermanagement/UserManagementView.vue')
 }
  ]
    },
    {
         id: '000',
         lable: '账号设置',//
         meta:{
           icon:'el-icon-document'
    },
         checked:false,
         children:[{
          id: '4',
          lable: '账号设置',
          path: '/personinfo',  //
          name:'personinfo',
          component: () => import(/* webpackChunkName: "personinfo" */ '../views/setuser/PersonInfoView.vue')
        },
        {
          id: '3',
          lable: '修改头像',
          path: '/setavatar', //
          name:'setavatar',
          component: () => import(/* webpackChunkName: 'manage' */ '../views/setuser/SetAvatarView.vue')
        }]
    },
    {
      id: '0000',
      lable: '任务中心',
      meta:{
        icon:'el-icon-eleme'
    },
    checked:false,
      children: [
        {
          id: '52',
          lable: '我的任务',
           path: '/chat',
          name: 'chat',
          component: () => import(/* webpackChunkName: 'chat' */ '../views/task/ChatView.vue')
        },
        {
          id: '53',
          lable: '任务列表',  //
          path: '/jurisdiction',
          name:'jurisdiction',
          component: () => import(/* webpackChunkName: "jurisdiction" */ '../views/task/JurisdictionView.vue')
        },
        {
          id: '54',
          lable: '用户信息列表',//
          path: '/userlist',
          name:'userlist',
          component: () => import(/* webpackChunkName: "userlist" */ '../views/task/UserListView.vue')
        },
        {
          id: '2',
          lable: '创建任务', //
          path: '/createdtask',
          name:'createdtask',
          component: () => import(/* webpackChunkName: "wefha" */ '../views/task/CreatedTaskView.vue')
      },
      ],
    },
    {
      id:'00000',
      lable:'其他',
      meta:{
        icon:'el-icon-monitor'
    },
    checked:false,
    children: [
      {
        id:'61',
        lable: '关于我们',
        path: '/other',  //
        name:'other',
        component: () => import(/* webpackChunkName: "other" */ '../views/OtherView.vue')
      },
  ],
    }
  ];