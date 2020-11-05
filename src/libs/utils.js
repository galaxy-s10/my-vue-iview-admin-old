let utils = {}

// 判断a是否在b数组里
utils.oneOf=(a,b)=>{
    console.log('判断a是否在b数组里');
    b.forEach(item=>{
        console.log(item);
    })
}

export default utils;