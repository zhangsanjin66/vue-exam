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
          meta:{
            identifys:[1,2]  //1 是老师  2是学生
        }
        },
        {
          id: "12",
          lable: "创建题库",
          path:'htmlmanage',
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "13",
          lable: "题库列表",
          path: "about",
          meta:{
            identifys:[1,2]  
        }
        },
        {
          id: "14",
          lable: "删除题库",
          path:'cssmanage',
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "15",
          lable: "修改题库",
          path:'competition',
          meta:{
            identifys:[1]  
        }
        },
      ],
    },
    {
      id: "2",
      lable: "角色管理",
      meta:{
        icon:'el-icon-user'
    },
      checked:false,
      children:[{
         id: "21",
         lable: "角色管理",
         path: "management",
         meta:{
          identifys:[1]  
      }
    },{
         id: "22",
         lable: "权限配置",
         path: "permissionmanagement",
         meta:{
          identifys:[1]  
      }
    },{
      id: "23",
      lable: "创建角色",
      path: "usermanagement",
      meta:{
        identifys:[1]  
    }
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
          lable: "修改用户信息",
          path: "personinfo",
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "32",
          lable: "修改头像",
          path: "setavatar",
          meta:{
            identifys:[1]  
        }
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
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "53",
          lable: "任务列表",
          path: "jurisdiction",
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "54",
          lable: "用户列表",
          path: "userlist",
          meta:{
            identifys:[1]  
        }
        },
        {
          id: "55",
          lable: '创建任务',
          path: "createdtask",
          meta:{
            identifys:[1]  
        }
      },
      ],
    },
    {
      id:'6',
      lable:'其他',
      meta:{
        icon:'el-icon-monitor'
    },
    checked:false,
    children: [
      {
        id:'61',
        lable: '关于我们',
          path: "other",
          meta:{
            identifys:[1]  
        }
      },
  ],
    }
  ];