<template>
  <div>
    <hss-table
      :searchData="searchData"
      :tableData="{ list: userList.rows, count: userList.count }"
      :columns="columns"
      :params="params"
      @onSelect="onSelect"
      @onSearch="onSearch"
      @changePage="changePage"
    >
      <template slot-scope="{ row }" slot="operation">
        <hss-operation :row="row" :operation="operationData"></hss-operation>
      </template>
    </hss-table>
    <!-- <Table
      border
      :loading="userList.length == 0"
      :columns="columns"
      :data="userList"
    ></Table> -->
    <!-- <Modal v-model="showRole" title="编辑角色" @on-ok="ok" @on-cancel="cancel">
      <div>
        {{ showRole && currentRow && currentRow.username }}
      </div>
      <div class="aaa">
        <div v-if="allRole.length == 0" style="position: relative">
          <Spin size="large">
            <Icon type="ios-loading" class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
          </Spin>
        </div>
        <Tree
          v-else
          :data="allRole"
          :render="renderContent"
          show-checkbox
          @on-check-change="getChecked"
        ></Tree>
      </div>
    </Modal> -->

    <component
      v-bind:is="comments"
      :request="request"
      :fromData="columnForm"
      :initData="userInfo"
      :isInit="isInit"
      @on-cancel="onCancel"
      @on-ok="onOk"
      @onSubmit="onSubmit"
    ></component>
  </div>
</template>

<script>
import hssTable from "../../../components/hssComponents/table";
import hssOperation from "../../../components/hssComponents/table/operation";
import hssPopupForm from "../../../components/hssComponents/form/popup-form/index";

import { editStatus } from "../../../api/user";
import {
  addRole,
  getRoleList,
  editRoleAuth,
  editUserRole,
  deleteRole,
  findParentRole,
  findBrotherRole,
} from "../../../api/role";
import {
  getAuth,
  getUserRoleAuth,
  addAuthForRole,
  getUserRoleList,
} from "../../../api/roleauth";

// import { getRoleList, editUserRole } from "../../../api/role";
// import { getAuth, getUserRoleList } from "../../../api/roleauth";
import { mapState } from "vuex";
export default {
  components: { hssTable, hssOperation, hssPopupForm },
  data() {
    return {
      comments: "",
      request: {},
      columnForm: {},
      action: "edit",
      isInit: false,
      params: {
        is_admin: 1, //是否后台，是的话显示所有文章，包括未审核
        count: 0,
        pageSize: 10,
        nowPage: 1,
      },
      userInfo: {
        id: "",
        role_name: "",
        role_description: "",
        p_id: "",
        roles: [],
      },
      // 搜索列
      searchData: [
        {
          type: "Input",
          key: "username",
          name: "用户名",
          placeholder: "请输入用户名",
          width: 200,
        },
        {
          type: "Select",
          key: "status",
          name: "状态",
          placeholder: "请选择用户状态",
          data: [
            {
              label: "正常",
              value: 1,
            },
            {
              label: "禁用",
              value: 0,
            },
          ],
          width: 150,
        },
        // {
        // // DateTimeRange有bug，暂时不要用!
        //   type: "DateTimeRange",
        //   name: "时间范围",
        //   key: "timeRange",
        //   placeholder: "DateTimeRange",
        //   format: "yyyy-MM-dd HH:mm",
        //   width: 300,
        // },
      ],
      // 表格操作列
      operationData: [
        {
          name: "编辑",
          type: "CUSTOM", //CUSTOM（自定义）、ROUTER（路由方式）、DELETE（删除按钮）、STATUS（双状态切换）
          custom: async (row) => {
            console.log(row);
            if (!this.auth.includes("UPDATE_USER")) {
              this.$Message.error({
                content: "权限不足！",
              });
              return;
            }
            console.log("rowrow");
            console.log(row);
            console.log({ ...row });
            this.editRole({ ...row });
          },
          // 是否显示
          isShow() {
            return 1;
          },
        },
        {
          name: "删除",
          type: "TIP",
          customStyle: (row) => {
            return {
              color: "red",
            };
          },
          custom: (row) => {
            console.log(row);
            if (!this.auth.includes("DELETE_ARTICLE")) {
              this.$Message.error({
                content: "权限不足！",
              });
              return;
            }
            // delArticle(row.id).then((res) => {
            //   this.$Message.success({
            //     content: res.message,
            //   });
            //   this.getArticleList(this.params);
            // });
          },
          isShow() {
            return 1;
          },
        },
      ],
      flatRole: [],
      loading: true,
      showEditStatus: false,
      currentUser: {},
      roles: [],
      currentRow: {},
      allRole: [],
      currentRole: [],
      showRole: false,
      userList: [],
      columns: [
        {
          title: "id",
          key: "id",
          // width: 80,
          align: "center",
        },
        {
          title: "用户名",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("span", params.row.username);
          },
        },
        {
          title: "头像",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.avatar) {
              return h("img", {
                attrs: {
                  src: params.row.avatar,
                  style: "width:50px;height:50px",
                },
              });
            } else {
              return h("span", "无");
            }
          },
        },
        {
          title: "介绍",
          width: 150,
          // key: "title",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  style: "overflow:hidden;text-overflow:ellipsis;white-space: nowrap;",
                },
              },
              params.row.title
            );
          },
        },
        {
          title: "角色",
          width: 220,
          align: "center",
          render: (h, params) => {
            // this.flatTree(params.row)
            let data = params.row.roles;
            let role = [];
            if (data.length) {
              this.flatRole.forEach((item) => {
                data.forEach((item1) => {
                  if (item.id == item1.id) {
                    role.push(item);
                  }
                });
              });
              let temp = [];
              role.forEach((item) => {
                temp.push(h("Tag", [item.parent + "-" + item.role_name]));
              });
              console.log(role);
              role = temp;
            } else {
              role = "无";
            }
            return h(
              "div",
              {
                attrs: {
                  style: "display:flex;justify-content:center",
                },
              },
              role
            );
          },
        },
        {
          title: "收到赞",
          align: "center",
          render: (h, params) => {
            console.log(params);
            // if (!params.row.children) {
            return h("span", params.row.stars.length);
          },
        },
        {
          title: "状态",
          width: 100,
          align: "center",
          render: (h, params) => {
            console.log(params.row.status);
            // this.status = params.row.status == 1 ? true : false;
            // if (params.row.status == 1) {
            return h("iSwitch", {
              props: {
                value: params.row.status == 1 ? true : false,
                size: "large",
                "before-change": () => this.beforeChangeStatus(params.row),
              },
              on: {
                "on-change": (status) => this.changeStatus(status, params.row),
                // "on-change": (status) => {
                //   console.log(params.row);
                //   console.log(status);
                // },
              },
              scopedSlots: {
                open: () => {
                  return h("span", "正常");
                },
                close: () => {
                  return h("span", "禁用");
                },
              },
            });
          },
        },
        {
          align: "center",
          title: "创建时间",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.createdAt));
          },
        },
        {
          align: "center",
          title: "更新时间",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.updatedAt));
          },
        },
        {
          title: "操作",
          align: "center",
          slot: "operation",
          // width: 400,
        },
        // {
        //   align: "center",
        //   title: "操作",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "warning",
        //             size: "small",
        //           },
        //           style: {
        //             marginRight: "5px",
        //           },
        //           on: {
        //             click: () => {
        //               // this.show(params.row);
        //               // console.log("click");
        //               // this.action = "edit";
        //               console.log(params.row);
        //               // console.log()
        //               // this.editRole(params.row);
        //               this.editRole({ ...params.row });
        //             },
        //           },
        //         },
        //         "编辑"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small",
        //           },
        //           on: {
        //             click: () => {
        //               this.remove(params.row);
        //             },
        //           },
        //         },
        //         "删除"
        //       ),
        //     ]);
        //   },
        // },
      ],
    };
  },
  computed: {
    ...mapState("user", ["id", "role", "auth"]),
  },
  methods: {
    onCancel() {
      // this.showRole = false
      console.log("onCancel");
      this.roleInfo = {};
      this.comments = "";
      this.allAuth = [];
      this.currentAuth = [];
    },
    async onSubmit(v) {
      console.log(v);
      let temp = [];
      v.roles.forEach((item) => {
        temp.push(item.id);
      });
      console.log({ ...v, roles: temp });
      // if (this.action == "edit") {
      //   await editRoleAuth({ ...v, auths: temp }).then((res) => {
      //     console.log(res);
      //     this.$Message.success({
      //       content: res.message,
      //     });
      //   });
      // }
    },
    // 动态组件处理完回调
    onOk() {
      this.comments = "";
      console.log("object");
    },
    // 修改用户
    async editRole(v) {
      console.log(v);
      this.userInfo = v;
      // this.userInfo.roles = v.roles;
      this.getTree({ ...v });

      this.columnForm = {
        list: [
          {
            // name: "id",
            // type: "Input",
            prop: "id",
            // placeholder: "",
            // display:'none'
          },
          {
            type: "Input",
            name: "用户名",
            prop: "username",
            required: true,
          },
          {
            name: "头像",
            type: "Input",
            prop: "avatar",
            placeholder: "请输入头像",
            required: true,
          },
          {
            name: "介绍",
            type: "Input",
            prop: "title",
            placeholder: "请输入介绍",
            required: true,
          },
          {
            name: "状态",
            type: "Radio",
            data: [
              { label: "正常", value: 1 },
              { label: "禁用", value: 0 },
            ],
            prop: "status",
            required: true,
          },
          {
            name: "角色",
            type: "Tree",
            prop: "roles",
            required: true,
            isArray: true,
            data: this.allRole,
            renderContent: function renderContent(h, { root, node, data }) {
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
                    h("span", data.role_name + "(" + data.role_description + ")"),
                  ]),
                ]
              );
            },
          },
        ],
      };
      // this.userInfo.roles = this.allRole;
      this.request = {
        title: "编辑角色",
        size: "centre",
      };
      this.isInit = true;
      this.comments = "hssPopupForm";
    },
    onSelect(v) {
      console.log(v);
    },
    onSearch(v) {
      console.log(v);
    },
    changePage(v) {
      console.log(v);
      // this.params.nowPage = v;
      this.getUserRoleList(v);
    },
    async getTree(v) {
      // await this.getAuthList();
      console.log(v);
      // await this.getCurrentRole(v);
      // 递归将当前角色的权限在所有权限里添加checked为true
      // this.allAuth = depData;
      const deepData = JSON.parse(JSON.stringify(this.allRole));
      // const deepData = res.data.data
      console.log(deepData);
      // return
      const all = deepData;
      const val = JSON.parse(JSON.stringify(v.roles));
      console.log(all);
      console.log(val);
      function digui(list) {
        list.forEach((item) => {
          item.checked = false;
          if (item.children && item.children.length > 0) {
            digui(item.children);
          }
        });
      }
      digui(all);

      function digui1(value, list) {
        list.forEach((item) => {
          if (item.id == value.id) {
            item.checked = true;
          }
          if (item.children && item.children.length > 0) {
            digui1(value, item.children);
          }
        });
      }
      val.forEach((item) => {
        console.log(item);
        digui1(item, all);
      });

      console.log(deepData);
      console.log(all);
      console.log(val);
      // return

      const temp = [];
      function digui2(list) {
        list.forEach((item) => {
          if (item.checked == false) {
            temp.push(item.p_id);
            // temp.push({id:item.auth_id,pid:item.auth_pid})
          }
          if (item.children && item.children.length > 0) {
            digui2(item.children);
          }
        });
      }
      digui2(all);
      // console.log(deepData);
      // console.log(temp);
      // return;
      const newTemp = [...new Set(temp)];
      console.log(newTemp);
      function digui3(value, list) {
        list.forEach((item) => {
          console.log(item);
          console.log(value);
          if (value == item.id) {
            item.checked = false;
          }
          console.log(item.children);
          if (item.children && item.children.length > 0) {
            digui3(value, item.children);
          }
        });
      }

      newTemp.forEach((item) => {
        digui3(item, all);
      });
      console.log(deepData);
      console.log(temp);
      this.allRole = deepData;
    },
    flatTree(tree, role_name = "") {
      return tree.reduce((res, item) => {
        let val;
        if (item.children && item.children.length) {
          val = res.concat(
            this.flatTree(item.children, role_name + "-" + item.role_name)
          );
        } else {
          res.push({
            id: item.id,
            role_name: item.role_name,
            parent: role_name.slice(1),
          });
          val = res;
        }
        return val;
      }, []);
    },
    translateTree(data) {
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
    },
    test() {
      for (let i = 0; i < 100; i++) {
        this.$http("/api/article/typelist")
          .then((res) => {
            this.$Message.success({
              content: "请求ok",
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    beforeChangeStatus(user) {
      this.showEditStatus = true;
      this.currentUser = user;
      let { id, status } = user;
      console.log(id);
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: "提示",
          loading: this.loading,
          content:
            status == 1 ? `确认要禁用${user.username}吗` : `确认要启用${user.username}吗`,
          onOk: () => {
            // if (status == 1) {
            editStatus({ id, status: status == 1 ? 2 : 1 })
              .then((res) => {
                this.$Message.success({
                  content: res.message,
                });
                this.$Modal.remove();
                resolve();
              })
              .catch((err) => {
                console.log(err);
                this.$Message.error({
                  content: err.message,
                });
                this.$Modal.remove();
              });
          },
          onCancel: () => {
            // reject();
          },
        });
      });
    },
    changeStatus(status, user) {
      console.log("改变switch");
      console.log(status, user);
    },
    getChecked(v) {
      console.log(v);
      function getAllRoleId(data) {
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
      this.roles = getAllRoleId(v);
      // console.log(getAllRoleId(v));
    },
    // 获取所有角色
    getRoleList() {
      getRoleList().then((res) => {
        console.log("获取所有角色");
        // this.translateTree(data);
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
        let tree = handleRole(res.rows);
        console.log(tree);
        this.allRole = tree;
        let flat1 = this.flatTree(tree);
        this.flatRole = flat1;
        console.log("flat1");
        // console.log(flat1);
        // console.log(this.flatRole);
      });
    },
    // 获取当前用户的角色
    async getCurrentRole(v) {
      await getAuth(v.id).then((res) => {
        console.log("获取当前用户的角色");
        console.log(res);
        if (res.count > 0) {
          res.rows[0].user.roles.forEach((item) => {
            this.currentRole.push(item);
          });
        }
        // this.currentRole = this.role;
      });
    },
    async show(v) {
      this.showRole = true;
      this.currentRow = v;
      let that = this;
      await getRoleList().then((res) => {
        console.log("获取所有角色");
        let data = res.rows;
        console.log(data);
        this.translateTree(data);
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
        // this.allRole = handleRole(res.rows);
        this.allRole = this.translateTree(res.rows);
      });
      // await getAuth(v.id).then((res) => {
      //   console.log("获取我的角色");
      //   console.log(res);
      //   if (res.count > 0) {
      //     res.rows[0].user.roles.forEach((item) => {
      //       this.currentRole.push(item.role_name);
      //     });
      //   }
      //   // this.currentRole = this.role;
      // });
      function digui(data, val) {
        data.forEach((item1, index1) => {
          if (val.includes(item1.role_name)) {
            item1.checked = true;
          }
          if (item1.children) {
            digui(item1.children, val);
          }
        });
        // });
      }
      let depData = JSON.parse(JSON.stringify(this.allRole));
      digui(depData, this.currentRole);
      console.log("depData");
      console.log(this.currentRole);
      console.log(depData);
      this.allRole = depData;
    },
    ok() {
      // this.showRole = false
      console.log("ok");
      this.allRole = [];
      this.currentRole = [];
      editUserRole({
        id: this.currentRow.id,
        roles: this.roles,
      })
        .then((res) => {
          this.$Message.success({
            content: res.message,
          });
          getUserRoleList().then((res) => {
            console.log(res);
            this.userList = res.rows;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      // this.showRole = false
      console.log("quxiao");
      this.allRole = [];
      this.currentRole = [];
    },
    remove(v) {
      console.log(v);
    },
    //转换时间格式
    formateDate(datetime) {
      function addDateZero(num) {
        return num < 10 ? "0" + num : num;
      }
      let d = new Date(datetime);
      let formatdatetime =
        d.getFullYear() +
        "-" +
        addDateZero(d.getMonth() + 1) +
        "-" +
        addDateZero(d.getDate()) +
        " " +
        addDateZero(d.getHours()) +
        ":" +
        addDateZero(d.getMinutes()) +
        ":" +
        addDateZero(d.getSeconds());
      return formatdatetime;
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
            // h("span", data.role_name),
            h("span", data.role_name + "（" + data.role_description + "）"),
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
    getUserRoleList(v){
      getUserRoleList(v).then((res) => {
      this.userList = res;
    });
    }
  },
  created() {},
  mounted() {
    // this.show()
    this.getRoleList();
    this.getUserRoleList(this.params)
  },
};
</script>

<style scoped>
/deep/ .ivu-spin {
  text-align: initial;
}
/* .aaa /deep/ .ivu-tree ul li{
    margin: 0;
}
.aaa /deep/ .ivu-checkbox-disabled .ivu-checkbox-inner{
  background: #eee;
} */
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
