<template>
  <div>
    <Tree :data="treeData1" :render="renderContent"></Tree>
    <Modal v-model="showRole" title="编辑角色" @on-ok="ok" @on-cancel="cancel">
      <div>
        {{ showRole && currentRow && currentRow.username }}
      </div>
      <div class="aaa">
        <div v-if="allAuth.length == 0" style="position: relative">
          <Spin size="large">
            <Icon type="ios-loading" class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
          </Spin>
        </div>
        <Tree
          v-else
          :data="allAuth"
          :render="renderContent1"
          show-checkbox
          @on-check-change="getChecked"
        ></Tree>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getAuthList, addAuth } from "../../../../../api/auth";
import { getAuth, getOneRoleAuth } from "../../../../../api/roleauth";
import { getRoleList, addRole, deleteRole } from "../../../../../api/role";
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
    return {
      currentAuth: [],
      auths: [],
      roleList: [],
      showRole: false,
      currentRow: {},
      allAuth: [],
      newRoleName: "",
      newRoleDescription: "",
    };
  },
  created() {
    console.log(this.columns1);
    console.log(this.data1);
  },
  mounted() {},
  computed: {},
  methods: {
    ok() {
      // this.showRole = false
      console.log("ok");
      this.allAuth = [];
      this.currentAuth = [];
      console.log(this.currentRow.id);
      addAuth({
        id: this.currentRow.id,
        authList: this.auths,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      // this.showRole = false
      console.log("quxiao");
      this.allAuth = [];
      this.currentAuth = [];
    },
    getChecked(v) {
      console.log(v);
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
      console.log(this.auths);
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
          h("span", [h("span", data.auth_name + "-" + data.auth_description)]),
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
      console.log(data);
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
            h("span", data.role_name),
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
                      console.log(data);
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
                              this.$emit("refresh");
                              this.$Message.success({
                                content: res.message,
                              });
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          console.log();
                          this.append(data);
                        },
                      });
                      // this.append(data);
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
    async show(v) {
      this.showRole = true;
      this.currentRow = v;
      await getAuthList().then((res) => {
        console.log("获取所有权限");
        function handleAuth(data) {
          let temp = [];
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
              });
              if (children.length > 0) {
                tempItem.children = children;
                digui(data, children);
              }
            });
          }
          digui(data, temp);
          return temp;
        }
        this.allAuth = handleAuth(res.rows);
      });
      await getOneRoleAuth(v.id).then((res) => {
        console.log("获取当前角色的权限");
        console.log(res);
        if (res.count > 0) {
          res.rows.forEach((item) => {
            this.currentAuth.push(item.auth_id);
          });
        }
      });
      function digui(data, val) {
        data.forEach((item1, index1) => {
          if (val) {
            if (val.includes(item1.id)) {
              item1.checked = true;
            }
          }

          if (item1.children) {
            digui(item1.children, val);
          }
        });
        // });
      }
      let depData = JSON.parse(JSON.stringify(this.allAuth));
      digui(depData, this.currentAuth);
      this.allAuth = depData;
      console.log(this.allAuth);
    },
    deleteRole(v) {
      console.log(v);
      deleteRole(v.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    append(data) {
      const children = data.children || [];
      console.log((data.expand = true));
      children.push({
        role_name: "appended node",
        expand: true,
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find((el) => el === node).parent;
      const parent = root.find((el) => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    getRoleList() {
      getRoleList().then((res) => {
        let { rows } = res;
        function handleRole(data) {
          let temp = [];
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
        let temp = handleRole(rows);
        temp.forEach((item) => {
          console.log(temp);
          if (!item.children) {
            item._disableExpand = true;
          }
        });
        console.log(temp);
        this.roleList = temp;
      });
    },
  },
};
</script>

<style scoped>
</style>