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
        const myAuths = []
        const auths = store.state.user.roleAuth.auths
        // console.log('auths')
        // console.log(auths)
        auths.forEach(item=>{
            myAuths.push(item.auth_name)
        })
        // console.log('auths')
        // console.log(auths)
        // const access = store.state.auth
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
        if (value && myAuths) {
            const isPermission = checkAuth(myAuths, value)
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