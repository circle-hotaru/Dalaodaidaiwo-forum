/**
*  随机返回 min ~ max整数, 包含 min和 max 在内
*/
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = getRandom
