<template>
  <div>
    <Table
      border
      :loading="userList.length == 0"
      :columns="columns"
      :data="userList"
    ></Table>
    <Modal v-model="showRole" title="编辑角色" @on-ok="ok" @on-cancel="cancel">
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
    </Modal>
    <!-- <Modal
      v-model="showEditStatus"
      title="提示"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      确认{{ currentUser.status == 1 ? "禁用" : "开启" }}
    </Modal> -->
  </div>
</template>

<script>
import { editStatus } from "../../../api/user";
import { getRoleList, editUserRole } from "../../../api/role";
import { getAuth, getUserRoleList } from "../../../api/roleauth";
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
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
          width: "60",
        },
        {
          title: "用户名",
          width: "80",
          render: (h, params) => {
            return h("span", params.row.username);
          },
        },
        {
          title: "角色",
          render: (h, params) => {
            return h("span", "sdf");
          },
        },
        {
          title: "状态",
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
          title: "创建时间",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.createdAt));
          },
        },
        {
          title: "更新时间",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.updatedAt));
          },
        },
        {
          title: "操作",
          width: "130",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["id", "role"]),
  },
  methods: {
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
            status == 1
              ? `确认要禁用${user.username}吗`
              : `确认要启用${user.username}吗`,
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
                this.$Modal.remove();
              });
            // } else {
            //   editStatus({ id, status: 1 })
            //     .then((res) => {
            //       this.$Message.error({
            //         content: res.message,
            //       });
            //       this.$Modal.remove();
            //       resolve();
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }
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
      // console.log(this);
      // this.showEditStatus = true;
      // this.currentUser = params.row;
      // console.log(params.row);
      // console.log(status);
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
    async show(v) {
      this.showRole = true;
      this.currentRow = v;
      await getRoleList().then((res) => {
        console.log("获取所有角色");
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
        this.allRole = handleRole(res.rows);
      });
      await getAuth(v.id).then((res) => {
        // console.log("获取我的角色");
        // console.log(res);
        if (res.count > 0) {
          res.rows[0].user.roles.forEach((item) => {
            this.currentRole.push(item.role_name);
          });
        }
        // this.currentRole = this.role;
      });
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$http({
      //   url: "/api/role/editRole",
      //   method: "put",
      //   data: {
      //     id: this.currentRow.id,
      //     roles: this.roles,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
            h("span", data.role_name),
            // h("span", data.role_name + "（" + data.role_description + "）"),
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
  },
  created() {},
  mounted() {
    getUserRoleList().then((res) => {
      this.userList = res.rows;
    });
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