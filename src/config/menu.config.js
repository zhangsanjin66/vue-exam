export default [
    {
      id: "1",
      lable: "题库管理",
      meta:{
          icon:'el-icon-setting'
      },
      children: [
        {
          id: "11",
          lable: "题库管理",
          path: "manage",
        },
        // {
        //   id: "12",
        //   lable: "html题库",
        //   path:'',
        // },
        {
          id: "13",
          lable: "js题库",
          path: "about",
        },
        // {
        //   id: "14",
        //   lable: "css题库",
        //   path:'',
        // },
      ],
    },
    {
      id: "2",
      lable: "登录账号",
      path: "login",
      meta:{
        icon:'el-icon-user'
    },
    },
    {
      id: "3",
      lable: "注册账号",
      path: "register",
      meta:{
        icon:'el-icon-document'
    },
    },
    {
      id: "5",
      lable: "个人信息",
      meta:{
        icon:'el-icon-eleme'
    },
      children: [
        {
          id: "51",
          lable: "账号绑定",
          path: "personinfo",
        },
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
        {
          id: "55",
          lable: "权限管理",
          path: "management",
        },
      ],
    },
  ];