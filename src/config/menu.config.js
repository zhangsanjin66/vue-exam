export default [
    {
      id: "1",
      lable: "题库管理",
      meta:{
          icon:'el-icon-setting'
      },
      checked:false,
      children: [
        {
          id: "11",
          lable: "题库管理",
          path: "manage",
        },
        {
          id: "12",
          lable: "html题库",
          path:'htmlmanage',
        },
        {
          id: "13",
          lable: "js题库",
          path: "about",
        },
        {
          id: "14",
          lable: "css题库",
          path:'cssmanage',
        },
        {
          id: "15",
          lable: "比赛系统",
          path:'competition',
        },
      ],
    },
    {
      id: "2",
      lable: "权限管理",
      meta:{
        icon:'el-icon-user'
    },
      checked:false,
      children:[{
         id: "21",
         lable: "权限管理",
         path: "management",
    },          {
         id: "22",
         lable: "权限配置",
         path: "permissionmanagement",
    }
  ]
    },
    {
         id: "3",
         lable: "账号设置",
         meta:{
           icon:'el-icon-document'
    },
         checked:false,
         children:[      {
          id: "31",
          lable: "账号绑定",
          path: "personinfo",
        }]
    },
    {
      id: "5",
      lable: "任务中心",
      meta:{
        icon:'el-icon-eleme'
    },
    checked:false,
      children: [
        {
          id: "52",
          lable: "我的任务",
          path: "chat",
        },
        {
          id: "53",
          lable: "任务列表",
          path: "jurisdiction",
        },
        {
          id: "54",
          lable: "用户列表",
          path: "userlist",
        },

      ],
    },
  ];