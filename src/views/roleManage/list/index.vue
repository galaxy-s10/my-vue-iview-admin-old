<template>
  <div>
    <i-button @click="hssShow = !hssShow">新增角色</i-button>
    <Table
      border
      :loading="roleList.length == 0"
      :columns="columns"
      :data="roleList"
    ></Table>
    <Modal v-model="showRole" title="编辑角色" @on-ok="ok" @on-cancel="cancel">
      <div>
        <Form :model="roleInfo" :label-width="80">
          <FormItem label="id">
            <Input v-model="roleInfo.id" placeholder="id" disabled></Input>
          </FormItem>
          <FormItem label="角色名">
            <Input v-model="roleInfo.role_name" placeholder="id"></Input>
          </FormItem>
          <FormItem label="角色描述">
            <Input
              v-model="roleInfo.role_description"
              placeholder="请输入角色描述"
            ></Input>
          </FormItem>
        </Form>
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
          :render="renderContent"
          show-checkbox
          @on-check-change="getChecked"
        ></Tree>
      </div>
    </Modal>
    <hss-popup
      :show="hssShow"
      :title="hssTitle"
      @okk="popOk"
      @cancell="popCancel"
    >
      <Form :model="roleInfo" :label-width="80">
        <FormItem label="父级"> 无 </FormItem>
        <FormItem label="角色名">
          <Input
            v-model="roleInfo.role_name"
            placeholder="请输入角色名"
          ></Input>
        </FormItem>
        <FormItem label="角色描述">
          <Input
            v-model="roleInfo.role_description"
            placeholder="请输入角色描述"
          ></Input>
        </FormItem>
      </Form>
    </hss-popup>
  </div>
</template>

<script>
import hssPopup from "./component/popup";
import hssTable from "./component/table";
import hssTree from "./component/tree";
import { getAuthList } from "../../../api/auth";
import {
  addRole,
  getRoleList,
  editRoleAuth,
  deleteRole,
} from "../../../api/role";
import { getAuth, getOneRoleAuth, addAuthForRole } from "../../../api/roleauth";
export default {
  components: { hssPopup },
  data() {
    return {
      roleInfo: {
        id: "",
        role_name: "",
        role_description: "",
        p_id: 0,
      },
      hssShow: false,
      hssTitle: "新增角色",
      roleInfo: {},
      allAuth: [],
      auths: [],
      currentAuth: [],
      showRole: false,
      roleList: [],
      columns: [
        {
          type: "expand",
          width: 50,
          align: "center",
          render: (h, params) => {
            console.log("params.row.children");
            console.log(params.row.children);
            if (params.row.children) {
              // return h("span", params.row.children[1].role_name);
              return h(hssTree, {
                props: {
                  treeData1: params.row.children,
                },
                on: {
                  refresh: () => {
                    this.getRoleList();
                  },
                },
              });
            }
          },
        },
        {
          title: "id",
          key: "id",
          width: "100",
          align: "center",
        },
        {
          title: "角色名",
          width: "150",
          align: "center",
          render: (h, params) => {
            console.log(params);
            // if (!params.row.children) {
            return h("span", params.row.role_name);
          },
        },
        {
          title: "角色描述",
          align: "center",
          width: "150",
          render: (h, params) => {
            console.log(params);
            return h("span", params.row.role_description);
          },
        },

        {
          title: "创建时间",
          width: "150",
          align: "center",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.createdAt));
          },
        },
        {
          title: "更新时间",
          width: "150",
          align: "center",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.updatedAt));
          },
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
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
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      // this.deleteRole(params.row);
                    },
                  },
                },
                "新增"
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
                      this.deleteRole(params.row);
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
  computed: {},
  methods: {
    addRole() {
      // addRole(p_id, role_name, role_description).then((res) => {
      //   this.$message.success({
      //     message: res.message,
      //   });
      // })
    },
    popOk() {
      addRole({ ...this.roleInfo }).then((res) => {
        this.$Message.success({
          content: res.message,
        });
        this.getRoleList();
      });
    },
    popCancel() {},
    deleteRole(v) {
      console.log(v);
      deleteRole(v.id)
        .then((res) => {
          console.log(res);
          this.$Message.success({
            content: res.message,
          });
          this.getRoleList();
        })
        .catch((err) => {
          console.log(err);
        });
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
    async show(v) {
      this.showRole = true;
      this.roleInfo = v;
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
          if (val.includes(item1.id)) {
            item1.checked = true;
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
    ok() {
      // this.showRole = false
      console.log("ok");
      this.allAuth = [];
      this.currentAuth = [];
      editRoleAuth({
        id: this.roleInfo.id,
        auths: this.auths,
      })
        .then((res) => {
          this.$Message.success({
            content: res.message,
          });
          this.getRoleList();
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
        [h("span", [h("span", data.auth_name + "-" + data.auth_description)])]
      );
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
  created() {
    this.getRoleList();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
