
const getters = {
  theme: state => state.common.theme,
  // 计算价格
  totalPrice(state) {
    let Carlen = state.carList;
    let money = 0;
    console.log(state.carList.length);
    if (Carlen.length != 0) {
      Carlen.forEach((item) => {
        money += (item.price * 10000) * item.num
      })
      return money / 10000;
    } else {
      return 0;
    }
  },
  //返回购物车的总数
  carCount(state) {
    var numBer = 0
    console.log(state.carList);
    console.log(state.carList.length);
    let Carlen = state.carList;
    console.log(state);
    if (Carlen.length !== 0) {
      Carlen.forEach((item) => {
        numBer += item.num
      })
    } else {
      numBer = 0
    }

    return numBer
  }
}
export default getters