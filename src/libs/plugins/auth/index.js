import checkAuth from './checkAuth'

export default {
    bind(el, binding) {
        console.log('初始化');
    },
    inserted(el, binding) {
        console.log(el);
        console.log(binding);
        const {
            value
        } = binding
        console.log(value);
        const access =  [
            "ARTICLE_LIST",
            "ADD_ARTICLE",
            // "UPDATE_ARTICLE",
            // "SELECT_ARTICLE",
            // "DELETE_ARTICLE",
          ]
        // store.state.auth
        if (value && access) {
            const isPermission = checkAuth(access, value)
            console.log(isPermission);
            if (!isPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            console.log('报错');
            throw new Error('缺少指令权限数据')
        }
    },
    update(el, binding) {
        console.log('更新');
        console.log(el);
        console.log(binding);
    }
}