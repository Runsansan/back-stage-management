<!--
 * @Author: flynn.yang
 * @Date: 2020-07-10 14:42:18
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-10 17:52:46
 * @Description: 
 * @Version: 1.0
--> 
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="message_item">
          <div class="message_time">2020-05-13 19:11</div>
          <sapn class="message_circle"></sapn>
        </div>
        <div class="message_item">
          <div class="message_time">2020-05-13 19:10</div>
          <sapn class="message_circle"></sapn>
        </div>
      </el-col>
      <el-col :span="12">
        <!-- /* 信息框 */ -->
        <div class="box"></div>
      </el-col>
      <el-col :span="12">
        <div class="box1"></div>
      </el-col>
      <el-col :span="24">
        卡券贴
        <div class="coupon"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-col {
  margin-top: 20px;
}
.message_item {
  height: 145px;
  width: 300px;
  padding-left: 12px;
  border-left: 1px solid #979797;
  position: relative;
}
.message_time {
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  margin-bottom: 12px;
}
.message_circle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #547abd;
  border-radius: 50%;
  left: -4px;
  top: 5px;
}
/* 信息框 */
.box {
  width: 200px;
  height: 80px;
  background: #e3eaf4;
  position: relative;
}
.box::after {
  content: " ";
  height: 12px;
  width: 12px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -4px;
  left: 20px;
  position: absolute;
  background: #e3eaf4;
}
/* 2 */
.box1 {
  width: 200px;
  height: 80px;
  position: relative;
  border: 1px solid #e3eaf4;
  background-color: #ffffff;
}
.box1::after {
  content: " ";
  height: 12px;
  width: 12px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -8px;
  left: 20px;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #e3eaf4;
  border-bottom: none;
  border-right: none;
}
/* /一像素边框设置 */
.folder li {
  position: relative;
  padding: 5px;
}
.folder li + li:before {
  position: absolute;
  top: -1px;
  left: 0;
  content: " ";
  width: 100%;
  height: 1px;
  border-top: 1px solid #ccc;
  -webkit-transform: scaleY(0.5);
}
.coupon {
  width: 200px;
  height: 80px;
  background: radial-gradient(
        circle at right bottom,
        transparent 10px,
        #ffffff 0
      )
      top right / 50% 40px no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left /
      50% 40px no-repeat,
    radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom
      right / 50% 40px no-repeat,
    radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left /
      50% 40px no-repeat;
  filter: drop-shadow(3px 3px 3px #c5c5c5);
}
</style>
