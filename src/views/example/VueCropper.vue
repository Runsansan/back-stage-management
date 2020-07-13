<!--
 * @Author: flynn.yang
 * @Date: 2020-07-13 10:40:54
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 11:32:51
 * @Description: 
 * @Version: 1.0
--> 
<template>
  <div>
    <el-row class="input-style">
      <el-divider content-position="left">个人资料</el-divider>
      <el-form
        ref="personalInfo"
        :model="personalInfo"
        :rules="personalInfoRules"
        label-width="120px"
      >
        <el-col :span="12" :offset="8" style="margin-bottom:20px">
          <el-form-item prop="headImg">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-change="uploadHandleChange"
              :http-request="handleHttpRequest"
              :auto-upload="false"
            >
              <img v-if="option.img" :src="option.img" class="avatar" id="personalInfo-headImg" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="upload_span">(支持jpg、jpeg、gif、png、bmp 格式,大小2MB以内!)</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 图片裁剪 -->
    <el-dialog
      title="图片剪裁"
      :visible.sync="dialogVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <div class="cropper-content">
        <div class="cropper" style="text-align: center;">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeScale(1)">+</el-button>
        <el-button @click="changeScale(-1)">-</el-button>
        <el-button @click="rotateLeft">↺</el-button>
        <el-button @click="rotateRight">↻</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";

export default {
  data() {
    return {
      personalInfo: {
        id: window.sessionStorage.getItem("userId"),
        headId: "",
        // headUrl: '',
        loginName: "", //登录名
        name: "", //姓名
        age: "", //年龄
        sex: "", //性别
        company: "", //公司
        qqAcount: "", //qq
        email: "", //邮箱
        phoneNumber: "", //手机
        headImg: "" //base64
        // roleId:"971e8a83e8fa407688bf252ce039a30d"//角色ID
      },
      options: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 0,
          label: "女"
        }
      ],
      pwdForm: {
        // 旧密码
        oldPwd: "",
        // 新密码
        newPwd: "",
        // 确认新密码
        confirmNewPwd: ""
      },
      option: {
        img: "", // 裁剪图片的地址
        info: false, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 160, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        canMove: false,
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      dialogVisible: false, //图片裁剪的弹框dialog
      filename: "22222222", //文件名
      uploadUrl: "", //文件上传地址

      personalInfoRules: {
        headImg: [
          {
            required: true,
            message: "请选择个人头像",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    VueCropper
  },
  mounted() {},
  methods: {
    //图片改变的钩子
    uploadHandleChange(file) {
      console.log(file);
      this.fileName = file.name;
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isIMG = [
        ".jpeg",
        ".jpg",
        ".png",
        ".bmp",
        ".gif",
        ".JPEG",
        ".JPG",
        ".GIF",
        ".PNG",
        ".BMP"
      ].some(r => file.name.endsWith(r));
      if (!isIMG) {
        this.$message.error("上传图片只能是 jpg、jpeg、gif、 png、bmp 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      this.$nextTick(() => {
        console.log(URL.createObjectURL(file.raw));
        this.option.img = URL.createObjectURL(file.raw);
        this.dialogVisible = true;
      });
    },
    changeScale(val) {
      this.$refs.cropper.changeScale(val);
    },
    // 旋转图片
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //确定裁剪
    finish() {
      this.dialogVisible = false;
      this.$refs.cropper.getCropData(res => {
        console.log(res);

        // let file = this.dataURLtoFile(res, this.fileName);
        // this.handleHttpRequest(file);
      });
    },
    // // base64转file
    // dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // },
    //上传事件
    async handleHttpRequest(file) {
      console.log(file);
      //
      //   let formData = new FormData();
      //   formData.append("file", file);
      //   formData.append("type", 0);
      //   let config = {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   };
      //   const res = await this.$axios.post("upload/fileupload", formData, config);
      //   console.log(res);
      //   if (res.data.code == 0) {
      //     console.log(res.data.data);
      //     this.personalInfo.headImg = "data:image/png;base64," + res.data.data;
      //   }
    },
    //点击关闭按钮时关闭裁剪弹出框
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  // border-radius: 50%!important;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: block;
  border: 1px solid #eeeeee;
}
.avatar-uploader-icon {
  border: 1px dashed rgba(221, 221, 221, 1) !important;
}
.avatar-tips {
  margin-top: 100px !important;
}
.avatar-uploader span {
  color: #666666;
}
.el-input,
.el-select {
  height: 60px;
  width: 100%;
}
.el-input /deep/.el-input__suffix {
  height: 40px !important;
}
.input-style /deep/.el-input--small .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}
.el-form-item--small .el-form-item__content,
.el-form-item--small /deep/.el-form-item__label {
  line-height: 40px !important;
  color: #000000;
}
.el-button {
  width: 90px;
  height: 35px;
}
.cropper-content .cropper {
  width: auto;
  height: 300px;
}
.el-icon-view {
  cursor: pointer;
  height: 40px;
}

.pwd {
  color: #409eff;
}
.el-icon-s-open {
  font-size: 24px;
  color: #fff;
}
.input-style .el-input--small .el-input__icon {
  line-height: 40px;
}
.el-divider__text {
  font-size: 16px;
}
</style>
