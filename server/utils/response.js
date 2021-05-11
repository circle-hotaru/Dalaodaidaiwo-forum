/*
*  请求成功响应的数据格式
*  状态码：2xx 
*  code: 0 | 1 | 2
*/
function response(code, msg, data = {}) {
    return {
        code,
        msg,
        data
    }
}

module.exports = response
