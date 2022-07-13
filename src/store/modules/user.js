import { getUserInfoApi,getRolepermissionListApi } from '../../api/api'

export default{
    state:{
      userInfo:{},
      userRout:[],
      title:[]
    },
    getters:{

    },
    mutations:{
        userInfo:(state,payload)=>{
            state.userInfo=payload
          },
          ROUT:(state,payload)=>{
            state.userRout=payload
          },
          TITLE:(state,payload)=>{
            state.title=payload
          }
    },
    actions:{
      async  getUserInfoApi(ctx,payload){
            let res=await  getUserInfoApi(payload)
                ctx.commit('userInfo',res.data.data)
                return res
            },
    async getRolepermissionListApi(ctx,payload){
        let res =await getRolepermissionListApi(payload)
        ctx.commit('TITLE',res.data.data)
        return res
            }
    }
}