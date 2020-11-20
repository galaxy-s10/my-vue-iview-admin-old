<template>
  <div>
    <Button type="text"><Icon type="ios-add-circle" /></Button>
    <Tree :data="roleList" :render="renderContent" show-checkbox></Tree>
    <Table border :columns="columns" :data="roleList"></Table>
  </div>
</template>

<script>
import { getRoleList } from "../../../api/auth";
export default {
  components: {},
  data() {
    return {
      roleList: [],
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            console.log("params.row.children");
            console.log(params.row.children);
            if (params.row.children) {
              return h("span", {
                props: {
                  row: params.row,
                },
              });
            }
          },
        },
        {
          title: "id",
          key: "id",
          width: "60",
        },
        {
          title: "角色名",
          width: "150",
          render: (h, params) => {
            console.log(params);
            if (params.row.children) {
              return h("span", params.row.role_name);
            } else {
              return h("span", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        console.log(params.row);
                      },
                    },
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "md-add",
                        size: "small",
                      },
                    }),
                  ]
                ),
                h("span", params.row.role_name),
              ]);
            }
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
      let temp = handleRole(rows)
      temp.forEach(item=>{
        console.log(temp);
        if(!item.children){
          item._disableExpand = true
        }
      })
      console.log(temp);
      this.roleList = temp;
    });
  },
  mounted() {},
};
</script>

<style scoped>
</style>
