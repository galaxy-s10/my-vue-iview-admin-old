import checkAuth from './checkAuth'
import store from '@/store'

export default {
    bind(el, binding) {
        // console.log('----------初始化--------------------');
    },
    inserted(el, binding) {
        // console.log(el);
        // console.log(binding);
        const {
            value
        } = binding
        // console.log(value);
        // console.log('this.state');
        // console.log(store);
        // console.log(store);
        const access = store.state.auth.auth
        // const access =  [
        //     "ARTICLE_LIST",
        //     "ADD_ARTICLE",
        //     "UPDATE_ARTICLE",
        //     "SELECT_ARTICLE",
        //     "DELETE_ARTICLE",
        //   ]
        // console.log(value);
        // console.log(access);
        // console.log(value == access);
        // console.log('value == access');
        if (value && access) {
            const isPermission = checkAuth(access, value)
            // console.log('isPermission!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // console.log(isPermission);
            if (!isPermission) {
                el.parentNode && el.parentNode.removeChild(el)
                // console.log('移除');
            }
        } else {
            // console.log('这是不需要验证权限的路由，不移除');
            // throw new Error('缺少指令权限数据')
        }
    },
    update(el, binding) {
        // console.log('更新');
        // console.log(el);
        // console.log(binding);
    }
}