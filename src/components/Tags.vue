<!--
 * @Author: Misaka.chen
 * @Date: 2020-01-15 14:50:12
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:26:05
 * @Description: tag标签导航组件
 * @Version: 1.0
 -->

<template>
  <div class="tags" v-if="showTags">
    <div class="tabs-view-container">
      <router-link
        class="tags-view-item"
        :class="{'active': isActive(item.path)}"
        v-for="(item,index) in tagsList"
        :to="item.path"
        :key="index"
      >
        <el-tag
          closable
          :disable-transitions="false"
          size="small"
          @close.prevent.stop="closeTags(index)"
          @contextmenu.prevent.native="openMenu(item,$event)"
        >{{item.title}}</el-tag>
      </router-link>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeOther">关闭其他</li>
      <li @click="closeAll">关闭全部</li>
    </ul>
    <!-- <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>-->
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      visible: false,
      top: 0,
      left: 0
    };
  },
  mounted() {
    let ele = document.querySelector(".tags>.tabs-view-container>a>span>i");
    ele.style.display = "none";
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 10) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        });
      }
      bus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
    // 右击打开菜单
    openMenu(item, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = 15;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  created() {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on("close_current_tags", () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push("/");
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    });
  }
};
</script>

<style lang="less">
.tags {
  /* background-color: #f0f0f0; */
}
.tabs-view-container {
  height: 40px;
  padding: 5px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
  line-height: 25px;
}
.tabs-view-container .tags-view-item .el-tag {
  margin: 0 3px;
}
.tabs-view-container .tags-view-item .el-tag:first-child {
  margin-left: 0;
}
.tabs-view-container .tags-view-item.active .el-tag {
  // background-color: #409EFF;
  // color: #fff;
}
.tabs-view-container .tags-view-item.active .el-tag .el-icon-close {
  color: #fff;
}
.tabs-view-container .tags-view-item.active .el-tag:before {
  position: relative;
  content: "";
  background: #409efe;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 2px;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  line-height: 35px;
  z-index: 10;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
