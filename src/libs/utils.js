let utils = {}

// 判断a是否在b数组里
utils.oneOf = (a, b) => {
    // console.log('判断a是否在b数组里');
    b.forEach(item => {
        console.log(item);
    })
}

// 判断数组里是否有某个值
utils.exist = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == val) {
            return true
        }
    }
    return false
}

// 获取样式
utils.getStyle = (obj, name) => {
    if (window.getComputedStyle) {
        // 非ie
        return window.getComputedStyle(obj, null)[name];
    }
    else {
        // ie
        return obj.currentStyle[name];
    }
}

export default utils;