<template>
  <div>
    <Table border :columns="columns" :data="userList"></Table>
    <Modal
      v-model="showRole"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      {{ currentRow.user && currentRow.user.username }}
      <div v-if="currentRole.length">
        <Tree :data="allRole" :render="renderContent" show-checkbox></Tree>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getUserRoleList, getRoleList, getAuth } from "../../../api/auth";
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
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
            return h("span", params.row.user.username);
          },
        },
        {
          title: "角色",
          render: (h, params) => {
            console.log(params.row.user.roles);
            return h("span", "sdf");
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
        this.allRole = handleRole(res.rows);
      });
      await getAuth(v.user.id).then((res) => {
        console.log("获取我的角色");
        console.log(res);
        res.rows[0].user.roles.forEach((item) => {
          this.currentRole.push(item.role_name);
        });
        // this.currentRole = this.role;
      });
      console.log(this.currentRole);
      function digui(data, val) {
        // console.log(currentRole);
        // currentRole.forEach((item, index) => {
        // console.log(item);
        data.forEach((item1, index1) => {
          console.log(item1);
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
      console.log(depData);
      this.allRole = depData;
    },
    ok() {
      // this.showRole = false
      console.log("ok");
      this.currentRole = [];
    },
    cancel() {
      // this.showRole = false
      console.log("quxiao");
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
      console.log(res);
      this.userList = res.rows;
    });
  },
};
</script>

<style scoped>
</style>