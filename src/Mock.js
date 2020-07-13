const Mock = require('mockjs')
const Random = Mock.Random

const newsData = function () {
    let articles = []
    for (let i = 0; i < 26; i++) {
        let newsObj = {
            time: Random.date(),  //年月日
            Price: Random.natural(201, 205), //精确到时分秒
            number: Random.natural(201, 205),  //数字
            name3: Random.natural(201, 205),      //图片
            PriceData: Random.float(1, 100, 2, 3),  // true-false
            // name: Random.cname(),     //姓名
            // name1: Random.url(),       //url地址
            // name1: Random.province(),  //省
            // name1: Random.city(),     //市
            // name1: Random.county()  //区
        }
        articles.push(newsObj)
    }

    return {
        code: 0,
        msg: "操作成功",
        data: articles,
        total: 26
    }

}

Mock.setup({
    timeout: 500
})


const dataList = [] // 用于接受生成数据的数组
var imgData = [
    '../../assets/ccc.jpg', './assets/zzz.jpg', './assets/vvv.jpg', './assets/xxx.jpg',
]
for (let i = 0; i < 26; i++) { // 可自定义生成的个数

    const template = {
        time: Random.date(),  //年月日
        title: '商品' + Random.increment(1),
        price: Random.float(1, 100, 0, 2), //精确到时分秒
        id: Random.natural(0, 10000000),  //数字
        url: imgData[0],      //图片
        quantity: '' // true-false

    }

    dataList.push(template)

}

Mock.mock('http://106.12.252.167:9046/api/user/myTranferRecord', 'post', (params) => {
    console.log(params);

    var info = JSON.parse(params.body)
    console.log(info);

    var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length]

    var len = total / size

    var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len

    var newDataList = dataList.slice(index * size, (index + 1) * size)

    return {

        'code': '0',

        'message': 'success',

        'data': {

            'pageIndex': index,

            'pageSize': size,

            'rows': newDataList,

            'total': total,

            'totalPages': totalPages

        }

    }

})   //post请求
Mock.mock(RegExp("/api/user/myTranferRecord" + ".*"), 'get', newsData)   //get请求