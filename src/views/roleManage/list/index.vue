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
      let { rows } = res;
<<<<<<< HEAD
      function createTree(arr, pid) {
        let tree = [];
        arr.forEach((e) => {
          if (pid == e.p_id) {
            e.child = createTree(arr, e.id);
            tree.push(e);
          }
        });
        return tree;
      }
      // console.log(createTree(rows, 0));
      function parentDeal(data, pid) {
        //声明返回数组
        let returnArr = [];
=======
      function handleRole(data) {
        let temp = [];
>>>>>>> 0026bcdbb1c7756f34d5bb8ca1c2a1468fc42542
        data.forEach((item) => {
          if (item.p_id == 0) {
            temp.push(item);
          }
        });
        function digui(data, temp) {
          temp.forEach((tempItem, tempIndex) => {
            let children = [];
            data.forEach((dataItem, dataIndex) => {
              if (tempItem.id == dataItem.p_id) {
                // let children = tempItem.children ? tempItem.children : [];
                children.push(dataItem);
              }
              // if (children.length > 0) {
              //   digui(dataItem[1]);
              // }
            });
            console.log(tempItem);
            if (children.length > 0) {
              tempItem.children = children;
              digui(data, children);
            }
          });
        }
        digui(data, temp);
        return temp;
      }
<<<<<<< HEAD
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
=======
      this.roleList = handleRole(rows);
>>>>>>> 0026bcdbb1c7756f34d5bb8ca1c2a1468fc42542
    });
  },
  mounted() {},
};
</script>

<style scoped>
</style>