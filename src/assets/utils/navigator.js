export default{
    navigator(name) {
        if (this.$route.name == name) return;
        this.$router.push({
          name: name,
        });
      },
      install(Vue){
Vue.prototype.$navigator = this.navigator
      }
}