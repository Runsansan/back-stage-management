<template>
  <!-- 购物车 -->
  <div id="carBox">
    <!-- 商品总数 -->
    <h2 style="line-height:50px;font-size:16px;font-weight:bold">合计：总共{{count}}个商品，总价{{totalPrice}}元</h2>
    <p v-if="count==0">空空如也！·······</p>
    <div v-else>
      <el-table :data="carData" border style="width: 100%">
        <el-table-column fixed prop="id" align="center" label="商品id"></el-table-column>
        <el-table-column prop="title" align="center" label="商品标题"></el-table-column>
        <el-table-column prop="price" align="center" label="商品价格"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="reduceFun(scope.row)" type="text" size="small">-</el-button>
            <span>{{scope.row.num}}</span>
            <el-button @click="addCar(scope.row)" type="text" size="small">+</el-button>

            <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "carBox",
  data() {
    return {};
  },
  computed: {
    //购物车列表
    carData() {
      return this.$store.state.carList;
    },
    //商品总数
    count() {
      return this.$store.getters.carCount;
    },
    //商品总价
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  created() {
    console.log(this.carData);
    console.log(this.count);
    console.log(this.totalPrice);
  },
  methods: {
    // 增加数量
    addCar(row) {
      this.$store.dispatch("addCar", row);
    },
    // 减数量
    reduceFun(row) {
      this.$store.dispatch("reducedCar", row);
    },
    // 删除
    deleteFun(row) {
      this.$store.dispatch("deleteCar", row);
    }

    // 用户首次登录请求购物车的数据
    // initCar(){
    //   this.$store.dispatch('initCar')
    // }
  },
  created() {
    // this.initCar();
  },
  mounted() {}
};
</script>
 
<style>
#carBox {
  width: 900px;
  margin: 0 auto;
}
</style>
