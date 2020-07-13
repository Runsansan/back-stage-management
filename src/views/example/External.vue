<template>
  <!--通过@hook:updated监听组件的updated生命钩子函数-->
  <!--组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发-->
  <!-- <custom-select @hook:updated="$_handleSelectUpdated" /> -->
  <div>
    <div>通过@hook:updated监听组件的updated生命钩子函数</div>
    <div>Vue2.6提供的新API Vue.observable手动打造一个Vuex</div>
    <div>{{ userInfo.name }}</div>
  </div>
</template>
<script>
// import CustomSelect from "../components/custom-select";
import { store, mutations } from "../../observable";
export default {
  //   components: {
  //     CustomSelect
  //   },
  created() {
    mutations.setUserInfo({
      name: "子君"
    });
  },
  computed: {
    userInfo() {
      return store.userInfo;
    }
  },
  methods: {
    $_handleSelectUpdated() {
      console.log("custom-select组件的updated钩子函数被触发");
    }
  }
};
</script>
