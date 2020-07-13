<!--
 * @Author: flynn.yang
 * @Date: 2019-07-17 11:53:09
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-10 13:33:52
 * @Description: 
 * @Version: 1.0
--> 
<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="small"></el-date-picker>
    </div>
    <div>
      <!-- 中英文切换 -->
      <p>{{$t('message.common.account')}}</p>
      <p>{{lang|lang}}</p>
      <!-- 富文本 -->
      <editor id="tinymce" v-model="value" :init="init"></editor>
    </div>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-input v-model="input" placeholder="请输入内容" @change="inputChange"></el-input> -->
    <!-- <h1>{{input}}</h1> -->
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    Editor
  },
  data() {
    return {
      lang: "zh",
      value1: "",
      init: {},
      value: "dasdas",
      dialogVisible: false,
      input: "今天天气真好啊！"
    };
  },
  mounted() {
    /**
     * @Author: flynn.yang
     * @description: 富文本
     * @param {type}
     * @return:
     * @Version: 1.0
     */
    tinymce.init(this.init);
    var qs = require("querystring");
    var dataType = { pageNum: 1, pageSize: 1 };
    // this.$axios
    //   .post("classicCase/GetClassicCaseNumber", qs.stringify(dataType))
    //   .then(res => {
    //     console.log(res);
    //   });

    // {name:''}
    // .$post("classicCase/GetClassicCaseNumber", qs.stringify(dataType))
    //       .then(res => {
  },
  methods: {
    inputChange(e) {
      console.log(e);
    },
    handleSelect() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
      // vue实现数据双向绑定主要是：
      // 采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty（）来劫持各个属性的setter，getter，
      // 在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，
      // Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。
    }
  }
};
</script>