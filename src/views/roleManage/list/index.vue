<template>
  <div>
    <Tree :data="roleList" :render="renderContent" show-checkbox></Tree>
  </div>
</template>

<script>
import { getRoleList } from "../../../api/auth";
export default {
  components: {},
  data() {
    return {
      roleList: [],
    };
  },
  computed: {},
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
        },
        [
          h("span", [h("span", data.role_name)]),
          h("span", {
            style: {
              display: "inline-block",
              float: "right",
              marginRight: "32px",
            },
          }),
        ]
      );
    },
  },
  created() {
    getRoleList().then((res) => {
      console.log(res);
      let { rows } = res;
      function parentDeal(data, pid) {
        //声明返回数组
        let returnArr = [];
        data.forEach((item) => {
          if (item.p_id === pid) {
            //除去最高层级的数据（id === 0）
            returnArr.push(item);
            //进入递归中处理
            childrenDeal(data, item, item.id);
          }
        });
        return returnArr;
      }
      function childrenDeal(arr, itemData, itemId) {
        //首先判断是否有子类  没有默认为空
        itemData.children = itemData.children ? itemData.children : [];
        // if(itemData.children){
          arr.forEach((item) => {
          //递归条件
          if (item.p_id === itemId) {
            //找到则追加至上层数据children中
            itemData.children.push(item);
            //不断递归查找子类直到找不到子类本次递归结束才进入parentDeal函数进行下一最高层级操作
            childrenDeal(arr, item, item.id);
          }
        });
        // }
        
      }
      // parentDeal(rows,0)
      console.log(parentDeal(rows, 0));
      // this.roleList = parentDeal(rows, 0);
    });
  },
  mounted() {},
};
</script>

<style scoped>
</style>