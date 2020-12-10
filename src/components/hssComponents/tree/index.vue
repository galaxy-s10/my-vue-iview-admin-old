<template>
  <div>
    <Tree :data="treeData1" :render="renderContent"></Tree>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    treeData1: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    getChecked(v) {
      function getAllAuthId(data) {
        let temp = [];
        function digui(data) {
          data.forEach((item) => {
            temp.push(item.id);
            if (item.children) {
              digui(item.children);
            }
          });
        }
        digui(data);
        return [...new Set(temp)];
      }
      this.auths = getAllAuthId(v);
    },
    renderContent1(h, { root, node, data }) {
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
            h("span", data.auth_name + "(" + data.auth_description + ")"),
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
            // h("Icon", {
            //   props: {
            //     type: "md-key",
            //   },
            //   style: {
            //     marginRight: "8px",
            //   },
            // }),
            h("span", data.role_name + "(" + data.role_description + ")"),
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px",
              },
            },
            [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                  },
                  // props: Object.assign({}, this.buttonProps, {
                  //   icon: "ios-add",
                  // }),
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.show(data);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  // props: Object.assign({}, this.buttonProps, {
                  //   icon: "ios-add",
                  // }),
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      console.log(data);
                      this.$Modal.confirm({
                        render: (h) => {
                          return h("div", [
                            h("Input", {
                              props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: "请输入新增的角色名",
                              },
                              on: {
                                input: (val) => {
                                  this.newRoleName = val;
                                },
                              },
                            }),
                            h("Input", {
                              props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: "请输入角色描述",
                              },
                              on: {
                                input: (val) => {
                                  this.newRoleDescription = val;
                                },
                              },
                            }),
                          ]);
                        },
                        onOk: () => {
                          console.log(this.newRoleName);
                          console.log(this.newRoleDescription);
                          addRole({
                            p_id: data.id,
                            role_name: this.newRoleName,
                            role_description: this.newRoleDescription,
                          })
                            .then((res) => {
                              console.log(res);
                              this.$Message.success({
                                content: res.message,
                              });
                              this.$emit("refresh");
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          console.log();
                        },
                      });
                    },
                  },
                },
                "新增"
              ),
              h(
                "Button",
                {
                  // props: Object.assign({}, this.buttonProps, {
                  //   icon: "ios-remove",
                  // }),
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.deleteRole(data);
                    },
                  },
                },
                "删除"
              ),
            ]
          ),
        ]
      );
    },
  },
};
</script>

<style scoped>
</style>