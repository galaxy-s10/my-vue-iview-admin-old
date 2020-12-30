<template>
  <div>
    <hss-table
      :tableData="{ list: linkList.rows, count: linkList.count }"
      :searchData="searchData"
      :columns="columns"
      :params="params"
      @changePage="changePage"
    >
      <template slot-scope="{ row }" slot="operation">
        <hss-operation :row="row" :operation="operationData"></hss-operation>
      </template>
    </hss-table>

    <component
      v-bind:is="comments"
      :request="request"
      :fromData="columnForm"
      :initData="qiniuData"
      :isInit="isInit"
      @on-cancel="onCancel"
      @on-ok="onOk"
      @onSubmit="onSubmit"
    ></component>
    <!-- <hss-table v-if="tableData.list.length>0" :tableData="tableData" :columns="columns" :params="params"></hss-table> -->
  </div>
</template>

<script>
// import { format } from "../../../../../webchat/src/utils/format";
import { musicPageList, updateMusic, addMusic, deleteMusic } from "../../../api/music";
import { getQiniuToken, getQiniuList, updateQiniu } from "@/api/qiniu";
import hssPopupForm from "../../../components/hssComponents/form/popup-form/index";
import hssTable from "../../../components/hssComponents/table";
import hssOperation from "../../../components/hssComponents/table/operation";
import { mapState } from "vuex";
export default {
  components: { hssTable, hssOperation, hssPopupForm },
  data() {
    return {
      pageLimit: [
        { label: "10条", value: 10 },
        { label: "30条", value: 30 },
        { label: "50条", value: 50 },
        { label: "100条", value: 100 },
      ],
      flag: true, //是否可加载下一页
      action: "", //1:编辑，2:新增
      columnForm: {},
      qiniuData: {},
      comments: "",
      isInit: false,
      request: {},
      linkList: [],
      // 搜索列
      searchData: [
        {
          type: "Input",
          key: "name",
          name: "音乐名",
          placeholder: "请输入音乐名",
          width: 200,
        },
        {
          type: "Select",
          key: "status",
          data: [
            {
              label: "已通过",
              value: 1,
            },
            {
              label: "待审核",
              value: 0,
            },
          ],
          name: "状态",
          placeholder: "请选择状态",
          width: 200,
        },
      ],
      //表格操作列
      operationData: [
        {
          name: "编辑",
          type: "CUSTOM", //CUSTOM（自定义）、ROUTER（路由方式）、DELETE（删除按钮）、STATUS（双状态切换）
          customStyle: (row) => {
            // let bool = false;
            // if (this.auth.includes("UPDATE_TAG")) {
            //   console.log("yes");
            //   bool = true;
            // }
            // console.log(this.auth);
            // return {
            //   "pointer-events": bool ? "none" : "",
            //   color: "rgb(170, 170, 170)",
            // };
          },
          custom: async (row) => {
            console.log(row);
            if (!this.auth.includes("UPDATE_TAG")) {
              this.$Message.error({
                content: "权限不足！",
              });
              return;
            }
            this.action = 1;
            this.qiniuData = {
              ...row,
            };
            this.columnForm = {
              list: [
                {
                  prop: "id",
                },
                {
                  type: "Input",
                  name: "音乐名",
                  prop: "name",
                  placeholder: "请输入音乐名",
                  required: true,
                },
                {
                  name: "作者",
                  type: "Input",
                  prop: "author",
                  required: true,
                },
                {
                  name: "图片",
                  type: "Input",
                  prop: "img",
                  required: true,
                },
                {
                  name: "链接",
                  type: "Input",
                  prop: "url",
                  required: true,
                },
                {
                  name: "状态",
                  type: "Radio",
                  data: [
                    { label: "已通过", value: 1 },
                    { label: "待审核", value: 0 },
                  ],
                  prop: "status",
                  required: true,
                },
              ],
            };
            this.request = {
              title: "编辑标签",
              size: "centre",
            };
            this.isInit = true;
            this.comments = "hssPopupForm";
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
            if (!this.auth.includes("DELETE_TAG")) {
              this.$Message.error({
                content: "权限不足！",
              });
              return;
            }
            // if (row.articles.length > 0) {
            delLink(row.id).then((res) => {
              this.$Message.success({
                content: res.message,
              });
              this.getMusicPageList(this.params);
            });
            // }
          },
          isShow() {
            return 1;
          },
        },
      ],
      tableData: {
        list: "",
        count: "",
      },
      params: {
        is_admin:true,
        pageSize: 10,
        nowPage: 1,
      },
      columns: [
        {
          title: "id",
          align: "center",
          key: "id",
        },
        {
          title: "音乐名",
          align: "center",
          //   width: 100,
          key: "name",
        },
        {
          title: "作者",
          align: "center",
          //   width: 100,
          key: "author",
        },
        {
          title: "图片",
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
          title: "链接",
          align: "center",
          //   width: 100,
          key: "url",
        },
        {
          title: "状态",
          // width: 100,
          align: "center",
          render: (h, params) => {
            console.log(params.row.status);
            // this.status = params.row.status == 1 ? true : false;
            // if (params.row.status == 1) {
            return h("iSwitch", {
              props: {
                value: params.row.status ? true : false,
                size: "large",
                // "before-change": () => this.beforeChangeStatus(params.row),
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
                  return h("span", "通过");
                },
                close: () => {
                  return h("span", "待审");
                },
              },
            });
          },
        },
        {
          title: "修改时间",
          align: "center",
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
      ],
    };
  },
  computed: {
    ...mapState("user", ["auth"]),
  },
  created() {
    // this.getTagList();
  },
  mounted() {
    this.getMusicPageList(this.params);
  },
  methods: {
    onSelect() {
      this.params.marker = "";
      this.linkList = [];
      this.getQiniuList(this.params);
    },
    QiniuSearch() {
      this.params.marker = "";
      this.linkList = [];
      this.getQiniuList(this.params);
    },
    changePrefix(e) {
      console.log(e);
      this.params.prefix = e;
    },
    loadMore() {
      if (this.flag) {
        this.getQiniuList(this.params);
      }
    },
    beforeChangeStatus(v, row) {
    },
    changeStatus(v, row) {
      updateMusic({ ...row, status: v ? 1 : 0 }).then((res) => {
        this.$Message.success({
          content: res.message,
        });
        this.getMusicPageList(this.params);
      });
    },
    addTag() {
      this.action = 2;
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
            name: "名称",
            prop: "name",
            placeholder: "请输入友链名称",
            required: true,
          },
          {
            name: "头像",
            type: "Input",
            prop: "avatar",
            placeholder: "请输入友链头像",
            required: true,
          },
          {
            name: "描述",
            type: "Input",
            prop: "description",
            placeholder: "请输入友链描述",
            required: true,
          },
        ],
      };
      this.request = {
        title: "新增标签",
        size: "centre",
      };
      // this.isInit = true;
      this.comments = "hssPopupForm";
    },
    onCancel() {
      // this.showRole = false
      console.log("onCancel");
      this.roleInfo = {};
      this.comments = "";
    },
    onOk() {
      this.comments = "";
    },
    async onSubmit(v) {
      console.log(v);
      let temp = [];
      await updateMusic(v).then((res) => {
        console.log(res);
        this.$Message.success({
          content: res.message,
        });
        this.getMusicPageList({ ...this.params });
      });
    },
    onSearch(v) {
      console.log(v);
      console.log("!!!!!!!!!");
      this.getMusicPageList(v);
    },
    changePage(v) {
      console.log(v);
      this.getMusicPageList(v);
    },
    //转换时间格式
    formateDate(datetime) {
      console.log(datetime);
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
    getMusicPageList(v) {
      let that = this;
      musicPageList(v).then((res) => {
        console.log(res);
        this.linkList = res;
      });
    },
  },
};
</script>

<style scoped></style>
