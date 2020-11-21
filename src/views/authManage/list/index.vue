<template>
  <div>
    <Tree :data="roleList" :render="renderContent" show-checkbox></Tree>
  </div>
</template>

<script>
import { getAuthList, getUserAuth } from "../../../api/auth";
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
          h("span", [
            h("span", data.auth_name + "（" + data.auth_description + "）"),
          ]),
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
    // 获取所有权限列表
    getAuthList() {
      getAuthList().then((res) => {
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
    // 获取某个用户的所有权限
    getUserAuth(id) {
      console.log(id);
      let temp = [];
      getUserAuth(id)
        .then((res) => {
          console.log("获取某个用户的所有权限");
          console.log(res);
          let { count, rows } = res;
          rows.forEach((item) => {
            console.log(item.role.auths);
            item.role.auths.forEach((val) => {
              temp.push(val.id);
            });
          });
          console.log(temp);
          console.log([...new Set(temp)]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAuthList();
    this.getUserAuth(1);
  },
  mounted() {},
};
</script>

<style scoped>
</style>