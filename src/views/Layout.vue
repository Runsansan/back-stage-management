<template>
  <div class="layout">
    <!-- <div class="menuLayout" :class="{menuLayoutSmall:isCollapse==true}"> -->
    <!-- <div style="height:60px;"></div> -->
    <el-menu
      background-color="#00152a"
      text-color="#fff"
      router
      :active-text-color="color"
      :collapse="isCollapse"
      :collapse-transition="true"
      class="menuList el-menu-vertical-demo"
      :class="{menuListSmall:isCollapse==true}"
    >
      <!-- 一级菜单 -->
      <template v-for="item in list">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.path"
            >
              <template slot="title">
                <i :class="itemChild.icon"></i>
                <span>{{itemChild.name}}</span>
              </template>

              <!-- 三级菜单 -->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child .path"
                :key="itemChild_Child.path"
              >
                <i :class="itemChild_Child.icon"></i>
                <span slot="title">{{itemChild_Child.name}}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
              <i :class="itemChild.icon"></i>
              <span slot="title">{{itemChild.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!-- </div> -->
    <section class="right-content">
      <el-header style=" font-size: 16px">
        <el-row type="flex" class="row-bg">
          <el-col :span="2">
            <i class="el-icon-s-fold" @click="isCollapseClick"></i>
          </el-col>
          <el-col :span="17">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-menu-item index="2">问题中心</el-menu-item>
              <el-menu-item index="3">消息中心</el-menu-item>
              <el-menu-item index="4">
                <span>订单管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>

          <el-col :span="2">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{langData}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in lang"
                  :key="index"
                  :command="item.value"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2" class="paddingTop">
            <Theme class="theme"></Theme>
          </el-col>
          <el-col :span="1">
            <span style="margin-right: 15px">王小虎</span>
          </el-col>
          <el-col :span="1">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <vTags></vTags>
      <el-main>
        <router-view></router-view>
      </el-main>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  box-shadow: 0 1px 0.20833vw rgba(0, 21, 41, 0.08);
  line-height: 60px;
  padding: 0 50px;
  font-size: 20px;
}
.paddingTop {
  padding-top: 10px;
}
.menuList {
  width: 200px;
}
.menuListSmall {
  width: 65px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
// .el-menu-item.is-active {
//   background-color: #409eff !important;
// }
.menuLayout {
  width: 200px;
  min-height: 400px;
  background-color: #00152a;
}
.menuLayoutSmall {
  width: 65px;
  min-height: 400px;
  background-color: #00152a;
}
.right-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.layout {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.layout {
  width: 100%;
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .toggle {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 30px;
  }
}
</style>

<script>
import Theme from "@/components/Theme.vue";
import vTags from "../components/Tags.vue";
import bus from "../components/bus";
export default {
  components: {
    Theme,
    vTags
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      activeIndex: "1",
      color: "#409EFF",
      tableData: Array(20).fill(item),
      isCollapse: false,
      lang: [
        {
          name: "中文",
          value: "zh"
        },
        {
          name: "English",
          value: "en"
        }
      ],
      list: [
        {
          path: "/pages",
          name: "首页",
          icon: "el-icon-menu"
        },
        {
          path: "/1",
          name: "例子",
          icon: "el-icon-menu",
          children: [
            {
              path: "/1/1",
              name: "购物",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/shoppingList",
                  name: "商品列表",
                  icon: "el-icon-menu"
                },
                {
                  path: "/shoppingCart",
                  name: "购物车",
                  icon: "el-icon-menu"
                }
              ]
            }
          ]
        },
        {
          path: "/hook",
          name: "hook",
          icon: "el-icon-menu"
        },
        {
          path: "/External",
          name: "检测第三方函数",
          icon: "el-icon-menu"
        },
        {
          path: "/extend",
          name: "extend",
          icon: "el-icon-menu"
        },
        {
          path: "/suk",
          name: "suk 邻接矩阵",
          icon: "el-icon-menu"
        },
        {
          path: "/css",
          name: "css",
          icon: "el-icon-menu"
        },
        {
          path: "/VueCropper",
          name: "VueCropper",
          icon: "el-icon-menu"
        }
      ],
      data: [
        {
          name: "daohang1",
          index: "1",
          children: [
            {
              name: "danghang1-1",
              index: "1-1"
            },
            {
              name: "danghang1-2",
              index: "1-2",
              children: [
                {
                  name: "danghang1-2-1",
                  index: "1-2-1"
                }
              ]
            }
          ]
        },
        { name: "daohang2", index: "2" }
      ],
      langData: "多语言"
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("i18"));
    console.log(this.$store.state.theme);
    // $store.state.msg
    if (localStorage.getItem("theme")) {
      this.color = JSON.parse(localStorage.getItem("theme")).content;
    } else {
      this.color = "#409EFF";
    }

    if (!sessionStorage.getItem("i18")) {
      this.langData = "多语言";
    } else if (sessionStorage.getItem("i18") == "zh") {
      this.langData = "中文";
    } else {
      this.langData = "English";
    }
  },
  methods: {
    handleSelect() {},
    isCollapseClick() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(val) {
      console.log(val);
      if (val == "zh") {
        this.langData = "中文";
      } else {
        this.langData = "English";
      }
      this.$i18n.locale = val;
      localStorage.setItem("i18", val);
      // this.$store.state.urll = this.$route.path;
      // this.$router.push("/blank");
    }
  }
};
</script>
<style>
</style>