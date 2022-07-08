const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // axios.post('/api/user/login')
    // axios.post('http://192.168.1.5:7001/user/login')
    proxy:{
      '/api': {
        target:'http://192.168.0.127:7001',  //服务端的域名地址
        ws:true,
        changeOrigin:true,
        pathRewrite:{'^/api' : ''}
      }
    }
  }
})
