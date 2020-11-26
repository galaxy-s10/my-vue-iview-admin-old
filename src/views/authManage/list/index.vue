<template>
  <div>
    <Table
      border
      :loading="roleList.length == 0"
      :columns="columns"
      :data="roleList"
    ></Table>
    <Modal v-model="showRole" title="编辑权限" @on-ok="ok" @on-cancel="cancel">
      <div>
        {{ showRole && currentRow && currentRow.username }}
      </div>
      <!-- <div class="aaa">
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
      </div> -->
    </Modal>
    <!-- <Tree :data="roleList" :render="renderContent" show-checkbox></Tree> -->
  </div>
</template>

<script>
import hssTable from "./component/table";
import hssTree from "./component/tree";
import { getAuthList, getUserAuth } from "../../../api/auth";
export default {
  components: { hssTable, hssTree },
  data() {
    return {
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
          title: "权限名",
          width: "150",
          align: "center",
          render: (h, params) => {
            console.log(params);
            // if (!params.row.children) {
            return h("span", params.row.auth_name);
          },
        },
        {
          title: "权限描述",
          width: "150",
          align: "center",
          render: (h, params) => {
            console.log(params);
            // if (!params.row.children) {
            return h("span", params.row.auth_description);
          },
        },
        {
          title: "创建时间",
          align: "center",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.createdAt));
          },
        },
        {
          title: "更新时间",
          align: "center",
          render: (h, params) => {
            return h("span", this.formateDate(params.row.updatedAt));
          },
        },
        {
          title: "操作",
          align: "center",
          width: "250",
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
                      this.deleteRole(params.row);
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