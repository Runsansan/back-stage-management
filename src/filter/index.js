/*
 * @Author: flynn.yang
 * @Date: 2019-07-17 16:41:11
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-10 17:46:27
 * @Description: 
 * @Version: 1.0
 */
function lang(data) {
    if (data == null) {
        return "多语言"
    } else if (data == "zh") {
        return "中文"

    } else {
        return 'English'
    }
}

/**
 * @param { string } 验证不能包含字母12222
 */
export const isNoWord = value => /^[^A-Za-z]2*$/g.test(value);
/**
 * @param { string } 验证中文和数字

 */
export const isCHNAndEN = value => /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value);
/**
 * @param { string } value
 */
export const isPostcode = value => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);

export default {
    lang
}