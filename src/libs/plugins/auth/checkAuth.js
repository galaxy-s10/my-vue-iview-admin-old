export default (authData, value) => {
    // console.log(authData);
    let status = false;
    if(typeof value == 'string'){
        status = authData.includes(value)
    }else if(value instanceof Array){
        value.some(item=>{
            if(authData.includes(item)) status = true
        })
    }
    return status
}