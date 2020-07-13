<template>
  <!-- vue echarts 自适应 hook 
  在Vue组件中，可以用过$on,$once去监听所有的生命周期钩子函数，如监听组件的updated钩子函数可以写成 this.$on('hook:updated', () => {})
  -->
  <div style="height:100%">
    <div class="echarts" id="main" ref="myEchart" style="width: 80%;height:80%;"></div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      tableData: [], //商品列表
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0,
      showMoveDot: []
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(this.$refs.myEchart);
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
    },
    $_handleResizeChart() {
      this.chart.resize();
    }
  },
  mounted() {
    this.drawChart();
    window.addEventListener("resize", this.$_handleResizeChart);
    this.$once("hook:beforeDestroy", () => {
      console.log("hook");

      window.removeEventListener("resize", this.$_handleResizeChart);
    });
  }
  //   beforeDestroy() {
  //     // 组件销毁时，销毁监听事件
  //     window.removeEventListener("resize", this.$_handleResizeChart);
  //   }
};
</script>