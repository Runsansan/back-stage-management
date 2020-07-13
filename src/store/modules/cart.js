

var data = []
const cart = {

    state: {
        carList: [] //购物车的商品
    },
    mutations: {
        addCar(state, params) {
            console.log(params);
            console.log(state.carList);
            let CarCon = state.carList;


            console.log(CarCon);
            // 判断如果购物车是否有这个商品，有就只增加数量，否则就添加一个
            // some 只要有一个isHas为true,就为true
            let isHas = CarCon.some((item) => {
                if (params.id == item.id) {
                    item.num++;
                    return true;
                } else {
                    return false;
                }
            })

            if (!isHas) {
                let obj = {
                    "id": params.id,
                    "title": params.title,
                    "price": params.price,
                    "num": 1,
                }
                // console.log(obj);
                // data.push(obj)
                state.carList.push(obj)
                this.state.carList = state.carList
                console.log(state.carList);


            }
        },
        // 减
        reducedCar(state, params) {
            let len = state.carList.length;
            for (var i = 0; i < len; i++) {
                if (state.carList[i].id == params.id) {
                    state.carList[i].num--
                    if (state.carList[i].num == 0) {
                        alert('不能在减少了！！！')
                        state.carList[i].num++
                        // state.carList.splice(i, 1);

                        break;
                    }
                }
            }
        },
        //移出
        deleteCar(state, params) {
            let len = state.carList.length;
            for (var i = 0; i < len; i++) {
                if (state.carList[i].id == params.id) {
                    state.carList.splice(i, 1);
                    break;
                }
            }
        },

        // 初始化购物车，有可能用户一登录直接进入购物车
        // initCar(state, car) {
        //     state.carList = car
        // },


    },
    actions: {
        // 加
        addCar({ commit }, params) {
            console.log({ commit }) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("addCar", params)
                }
            }, 100)
        },
        // 减
        reducedCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("reducedCar", params)
                }
            }, 100)
        },
        // 移出
        deleteCar({ commit }, params) {
            // console.log(params) //点击添加传过来的参数
            // 使用setTimeout模拟异步获取购物车的数据
            setTimeout(function () {
                let result = 'ok'
                if (result == 'ok') {
                    // 提交给mutations
                    commit("deleteCar", params)
                }
            }, 100)
        }
    }
}
export default cart  
