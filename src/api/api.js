import axios from 'axios'
//api.js 是参访服务端接口的


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    //请求拦截器会在请求接口是都会走这个方法
    //我们可以在请求这个方法到服务端的时候，把这个用户的token值给放到请求头中，
    //请求拦截器是在请求服务之前进入这个方法 
    config.headers.authorization=sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //响应拦截器使用来做接口的数据拦截的。
    //响应拦截器 是在返回数据之后(.then  方法之前)，才会进去响应拦截器
    if (response.data.status == 401) {
     window.location.href = '/'
      }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
/**
 * @description  获取配置
 ***/
const baseURL ='/api';
const postConfig={
    baseURL,
     headers: {
     contentType:'application/json',
     },
}


/**
 * @description  登录接口
 *
 * @param payload<object>
 * @param payload.username 用户名   
 * @param payload.password  密码    
 * @param payload.captcha    验证码
 * **/
export function getUserLoginApi(payload={}){
  return  axios.post("/user/login",payload,postConfig)
}


/**
 *  @description 注册接口
 *  @param payload <object>
 * @param payload.username 用户名   
 * @param payload.password  密码    
 * @param payload.captcha    验证码
 *  @param payload.phone   手机号
 *  @param payload.email   验证码
 * **/
export function getUserRegisterApi(payload={}){
    return  axios.post("/user/register",payload,postConfig)
}


/**
 * @description  获取用户信息
 ***/
export function getUserInfoApi(payload={}){
    return  axios.post("/user/info",payload,postConfig)
}



/**
 * @description  修改用户信息
 * @param payload   <object>
 *   @param payload.phone : <string>,    //手机号 
     @param payload.email : <string>,    //邮箱 
      @param payload.sex   : <number>,    //性别 1 ： 男   0： 女
     @param payload.avatarName: <string>, //昵称
      @param payload.name  ：<string>,    //真实姓名
      @param payload.provinceNo: <string>,  //省编号
      @param payload.cityNo: <string>,    //市编号
       @param payload.areaNo: <string>,    //区编号
       @param payload.townNo: <string>,    //镇编号
      @param payload.desc:   <string>,    //个人介绍
 ***/
export function updateUserInfoApi(payload={}){
    return  axios.post("/user/update",payload,postConfig)
}



/**
 * @description  退出登录的接口
 ***/
export function getUserLogoutApi(payload={}){
    return  axios.post("/user/logout",payload,postConfig)
}



/**
 * @description  获取验证码的接口
 ***/
export function getCaptchaApi(){
    return `${baseURL}/captcha?`+ Math.random();
}


/**
 * @description  查询题库列表的接口
 *  @param payload <object>
 *  @param payload.type  题目类型  1：单选题  2：多选题  3：填空题  4：问答题 <number>
 * @param payload.pagination  非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页 <boolean>
 * @param payload.pageSize   非必填  每页获取几条数据  如果不传 默认是获取10条；<number>
 * @param payload.pageNum     //非必填  想获取第几页的数据  如果不传 默认是第1页；<number>
 * @param payload.title     //非必填。题目标题
 ***/

export function queryQuestionBankApi(payload={}){
    return  axios.post("/question/list",payload,postConfig)
}

/**
 * @description  创建题库的接口
 * @param  payload <object>
 * @param payload.type 题目类型  1：单选题  2：多选题  3：填空题  4：问答题 <number>
 * @param payload.title  题目标题 <string>
 * @param payload.questionA  选项A
 * @param payload.questionB   选项B
 * @param payload.questionC    选项C                
 * @param payload.questionD    选项D
 * @param payload.answer    答案
 * @param payload.level    难度系数  1：简单  2：普通 3：困难
 ***/

export function createQuestionBankApi(payload={}){
    return  axios.post("/question/create",payload,postConfig)
}



/**
 * @description  修改题库的接口
 * @param  payload <object>
 *   @param  payload.id   <number>,   // 必填 题目id
  *  @param  payload.type<number>,  // 必填 题目类型
  * @param payload.questionA  选项A
 * @param payload.questionB   选项B
  * @param payload.answer    答案
  * @param payload.level    难度系数  1：简单  2：普通 3：困难
 ***/

export function updateQuestionBankApi(payload={}){
    return  axios.post("/question/update",payload,postConfig)
}



/**
 * @description  删除题库的接口
 * @param  payload <object>
 *   @param  payload.id   <number>,   // 必填 题目id
  *  @param  payload.type<number>,  // 必填 题目类型
 * 
 ***/

export function deleteQuestionBankApi(payload={}){
    return  axios.post("/question/delete",payload,postConfig)
}



/**
 * @description  查询我的记事薄列表
 * @param  payload <object>
 *   @param  payload.pagination  <boolean>, //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * 
 ***/

export function queryDiaryListApi(payload={}){
    return  axios.post("/diary/list",payload,postConfig)
}



/**
 * @description  增加我的记事薄
 * @param  payload <object>
 *   @param  payload.content:<string>, //记事薄内容
  *  @param  payload.progress:<number>, //进度  默认是0 最大填 100  指的是当前工作任务的进度；
 * 
 ***/

export function addDiaryCreateApi(payload={}){
    return  axios.post("/diary/create",payload,postConfig)
}



/**
 * @description  创建任务
 * @param  payload <object>
 *   @param  payload.name:<string>, //任务名称
  *  @param  payload.desc:<string>, //任务描述
  *  @param  payload.duration<int>  //任务时长
 * 
 ***/

export function createdTaskApi(payload={}){
    return  axios.post("/task/create",payload,postConfig)
}


/**
 * @description  编辑任务
 * @param  payload <object>
 *   @param  payload.id  :<number>, //任务id
  *  @param  payload.name:<string>, //任务名称
*  @param  payload.desc:<string>, //任务描述
  *  @param  payload.duration: <number>,  //任务时长
  *  @param  payload.level:<number>,  // 任务等级  1：紧急  0：普通任务
 * 
 ***/

export function updateTaskApi(payload={}){
    return  axios.post("/task/update",payload,postConfig)
}



/**
 * @description  发布/领取任务
 * @param  payload <object>
 *   @param  payload.userId:<array[<number>]>,  //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
  *  @param  payload.taskId:number,  //任务id  
 * 
 ***/

export function releaseTaskApi(payload={}){
    return  axios.post("/task/release",payload,postConfig)
}


/**
 * @description  查询任务列表
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * 
 ***/

export function queryTaskListApi(payload={}){
    return  axios.post("/task/list",payload,postConfig)
}


/**
 * @description  查询用户信息列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * 
 ***/

export function queryUserListApi(payload={}){
    return  axios.post("/user/list",payload,postConfig)
}



/**
 * @description  创建角色 
 * @param  payload <object>
 *   @param  payload.roleName:<string>, //角色名字
  *  @param  payload.groupId :<number>,  //分组id
 ***/

export function createdRoleApi(payload={}){
    return  axios.post("/role/create",payload,postConfig)
}



/**
 * @description  角色列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * 
 ***/

export function getRoleListApi(payload={}){
    return  axios.post("/role/list",payload,postConfig)
}



/**
 * @description  创建分组 
 * @param  payload <object>
 *   @param  payload.groupName:<string>, //分组名字
 ***/

export function createdRolegroupApi(payload={}){
    return  axios.post("/roleGroup/create",payload,postConfig)
}



/**
 * @description  分组列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * 
 ***/

export function getRolegroupListApi(payload={}){
    return  axios.post("/roleGroup/list",payload,postConfig)
}



/**
 * @description  查询任务详情 
 * @param  payload <object>
 *   @param  payload.taskId : <number>,    //任务id
 ***/

export function queryTaskDetailApi(payload={}){
    return  axios.post("/task/detail",payload,postConfig)
}



/**
 * @description  创建评论 
 * @param  payload <object>
 *   @param  payload.commentContent:<string>, //要评论的内容
 *   @param  payload.taskId:<number> //要评论任务的id
 *   @param  payload.userId:<number> //评论的用户id  是谁评论的
 ***/

export function createCommentApi(payload={}){
    return  axios.post("/comment/create",payload,postConfig)
}



/**
 * @description  获取评论列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/

export function queryCommentListApi(payload={}){
    return  axios.post("/comment/list",payload,postConfig)
}




/**
 * @description  获取权限列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/

export function getPermissionListApi(payload={}){
    return  axios.post("/permission/list",payload,postConfig)
}



/**
 * @description  获取功能权限列表 
 * @param  payload <object>
 *   @param  payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
  *  @param  payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  *  @param  payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/

export function getRolepermissionListApi(payload={}){
    return  axios.post("/rolePermission/list",payload,postConfig)
}
/**
 * @description  创建权限 
 * @param  payload <object>
 *   @param  payload.title :<string>, //标题
  *  @param  payload.type  :<number>  //类型
  *  @param  payload.pid   :<number>  //pid如果为空就是最大的一级  如果等于某项的id就是它的子级
 ***/

export function createPermissionApi(payload={}){
    return  axios.post("/permission/create",payload,postConfig)
}



/**
 * @description  修改权限 
 * @param  payload <object>
 *   @param  payload.title :<string>, //标题
  *  @param  payload.type  :<number>  //类型
  *  @param  payload.pid   :<number>  //父id
 ***/

export function updatePermissionApi(payload={}){
    return  axios.post("/permission/update",payload,postConfig)
}
/**
 * @description  删除权限 
 * @param  payload <object>
 *   @param  payload.title :<string>, //标题
  *  @param  payload.type  :<number>  //类型
  *  @param  payload.pid   :<number>  //pid如果为空就是最大的一级  如果等于某项的id就是它的子级
 ***/

export function deletePermissionApi(payload={}){
    return  axios.post("/permission/delete",payload,postConfig)
}



/**
 * @description  创建权限 
 * @param  payload <object>
 *   @param  payload.title :<string>, //选择的那个功能权限名称
  *  @param  payload.rId   :<number>  //角色的id
 ***/

export function createrolepermissionApi(payload={}){
    return  axios.post("/rolePermission/create",payload,postConfig)
}



/**
 * @description  返回头像 
 * @param  payload <object>
 ***/

export function AvatarListApi(payload={}){
    return  axios.post("/avatar/list",payload,postConfig)
}
