<template>
  <div>
    <Table
      border
      :loading="articleList.rows && articleList.rows.length == 0"
      :columns="columns"
      :data="articleList.rows"
    ></Table>
    <Page
      :total="articleList.count"
      show-total
      show-elevator
      @on-change="changePage"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { articlepage } from "../../../api/article";
export default {
  components: {},
  data() {
    return {
      params: {
        count: 0,
        pageSize: 10,
        nowPage: 1,
      },
      loading: true,
      showRole: false,
      articleList: [],
      columns: [
        {
          title: "id",
          key: "id",
          width: "60",
        },
        {
          title: "标题",
          width: "150",
          align: "center",
          render: (h, params) => {
            console.log(params);
            return h("span", params.row.title);
          },
        },
        {
          title: "封面图",
          width:"90",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.img,
                style: "width:50px;height:50px",
              },
            });
          },
        },
        {
          title: "浏览数",
          key: "click",
          width: "80",
          align: "center",
        },
        {
          title: "点赞数",
          width: "80",
          align: "center",
          render: (h, params) => {
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
                  return h("span", "发布");
                },
                close: () => {
                  return h("span", "审核");
                },
              },
            });
          },
        },
        {
          title: "评论",
          width: 100,
          align: "center",
          render: (h, params) => {
            console.log(params.row.status);
            // this.status = params.row.status == 1 ? true : false;
            // if (params.row.status == 1) {
            return h("iSwitch", {
              props: {
                value: params.row.is_comment == 1 ? true : false,
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
                  return h("span", "开启");
                },
                close: () => {
                  return h("span", "关闭");
                },
              },
            });
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
          width: "130",
          align: "center",
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
    changePage(v) {
      console.log(v);
      this.params.nowPage = v;
      this.getArticleList(this.params);
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
    getArticleList(params) {
      articlepage(params).then((res) => {
        this.articleList = res.pagelist;
        this.params.count = res.pagelist.count;
      });
    },
  },
  created() {},
  mounted() {
    this.getArticleList(this.params);
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