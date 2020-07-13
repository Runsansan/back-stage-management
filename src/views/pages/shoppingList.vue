

<style scoped>
</style>

<template>
  <!-- 商品列表 -->
  <div id="listBox">
    <!--  -->
    <!-- <img src="../../assets/zzz.jpg" alt /> -->
    <router-link :to="{path:'/shoppingCart'}" style="line-height:50px">跳转到购物车</router-link>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt width="40" height="40" class="head_pic" />
        </template>
      </el-table-column>

      <el-table-column prop="id" align="center" label="商品id"></el-table-column>
      <el-table-column prop="title" align="center" label="商品标题"></el-table-column>
      <el-table-column prop="price" align="center" label="商品价格"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="addCar(scope.row)" type="text" size="small">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <transition appear @before-appear="beforeEnter" @after-appear="afterEnter">
      <el-button @click="addCar(scope.row)">2222222</el-button>
      <div class="move_dot" ref="ball">
     
        <img src="../../assets/ccc.jpg" alt />
      </div>
    </transition>-->
    <div id="buycar"></div>
  </div>
</template>
 
<script>
export default {
  name: "listBox",
  data() {
    return {
      tableData: [], //商品列表
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0,
      showMoveDot: []
    };
  },
  methods: {
    // 初始化商品列表
    initTable() {
      var listParams = {
        pageIndex: 0,
        pageSize: 10
      };
      this.$axios.post("/user/myTranferRecord", listParams).then(res => {
        console.log(res); //这里返回的就是我们在mock中自定义的数据
        this.tableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 加入购物车
    addCar(row) {
      // console.log(row)
      // 提交给store里面actions 由于加入购物车的数据要同步到后台
      this.$store.dispatch("addCar", row);
      // this.elLeft = event.target.getBoundingClientRect().left;
      // this.elTop = event.target.getBoundingClientRect().top;   
      // console.log(this.elTop);
    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop -
        100}px , 0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置小球移动的位移
      el.style.transform = `translate3d(${badgePosition.left +
        30}px,${badgePosition.top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      // this.showMoveDot = this.showMoveDot.map(item => false);
      // 设置透明度
      el.style.opacity = 1;
    }
  },
  mounted() {
    this.initTable();
  }
};
</script>
<style>
#listBox {
  width: 900px;
  margin: 0 auto;
}
#buycar {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: red;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
img {
  animation: 0.88s mymove ease-in-out;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
</style>
