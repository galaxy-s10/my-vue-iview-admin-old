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
      let temp = [];
      function digui() {
        rows.forEach((item) => {
          if (item.p_id == 0) {
            temp.push(item);
          }
        });
      }
      digui();
      console.log(temp);
      function digui1() {}
      temp.forEach((tempItem) => {
        rows.forEach((rowsItem) => {
          if (tempItem.id == rowsItem.p_id) {
            if (tempItem.children) {
              tempItem.children.push(rowsItem);
            } else {
              tempItem.children = [];
              tempItem.children.push(rowsItem);
            }
          }
        });
      });
      console.log(temp);
      this.roleList = temp;
    });
  },
  mounted() {},
};
</script>

<style scoped>
</style>