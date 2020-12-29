<template>
  <div>
    <!-- <div v-if="tableData.list"> -->
    <div style="margin-bottom: 10px"></div>
    <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
      <div>
        <i-button>上传文件</i-button>
      </div>
      <div style="display: flex">
        <div style="width: 200px; margin-right: 10px">
          <i-input @input="changePrefix" placeholder="请输入文件名前缀"></i-input>
        </div>
        <i-button type="info" @click="QiniuSearch">搜索</i-button>
      </div>
    </div>

    <hss-table
      :tableData="{ list: linkList }"
      :columns="columns"
      @changePage="changePage"
    >
      <template slot-scope="{ row }" slot="operation">
        <hss-operation :row="row" :operation="operationData"></hss-operation>
      </template>
    </hss-table>
    <!-- </div> -->
    <div style="text-align: center; height: 40px; line-height: 40px; font-size: 16px">
      <span style="color: #00aae7" @click="loadMore">{{
        flag ? "加载更多" : "已加载全部"
      }}</span>
    </div>

    <component
      v-bind:is="comments"
      :request="request"
      :fromData="columnForm"
      :initData="tagInfo"
      :isInit="isInit"
      @on-cancel="onCancel"
      @on-ok="onOk"
      @onSubmit="onSubmit"
    ></component>
    <!-- <hss-table v-if="tableData.list.length>0" :tableData="tableData" :columns="columns" :params="params"></hss-table> -->
  </div>
</template>

<script>
import { format } from "../../../../../webchat/src/utils/format";
import { linkPageList, editLink, delLink } from "../../../api/link";
import { getQiniuToken, getQiniuList } from "@/api/qiniu";
import hssPopupForm from "../../../components/hssComponents/form/popup-form/index";
import hssTable from "../../../components/hssComponents/table";
import hssOperation from "../../../components/hssComponents/table/operation";
import { mapState } from "vuex";
export default {
  components: { hssTable, hssOperation, hssPopupForm },
  data() {
    return {
      flag: true, //是否可加载下一页
      action: "", //1:编辑，2:新增
      columnForm: {},
      tagInfo: {},
      comments: "",
      isInit: false,
      request: {},
      linkList: [],
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
            this.tagInfo = { ...row, createdAt: format(row.createdAt) };
            this.columnForm = {
              list: [
                {
                  prop: "id",
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
                {
                  name: "链接",
                  type: "Input",
                  prop: "url",
                  placeholder: "请输入友链链接",
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
                // {
                //   name: "创建时间",
                //   type: "Date",
                //   prop: "createdAt",
                //   isDate: true,
                //   placeholder: "请选择创建时间",
                //   required: true,
                // },
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
              this.getLinkPageList(this.params);
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
        // count: 0,
        limit: 10,
        prefix: "", //前缀
        marker: "",
      },
      columns: [
        // {
        //   title: "哈希值",
        //   align: "center",
        //   //   width: 100,
        //   render: (h, params) => {
        //     return h(
        //       "span",
        //       {
        //         attrs: {
        //           style: "overflow:hidden;text-overflow:ellipsis;white-space: nowrap;",
        //         },
        //       },
        //       params.row.hash
        //     );
        //   },
        // },
        {
          title: "文件名",
          align: "center",
          //   width: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  style: "overflow:hidden;text-overflow:ellipsis;white-space: nowrap;",
                },
              },
              params.row.key
            );
          },
        },
        {
          title: "预览",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: "https://img.cdn.zhengbeining.com/" + params.row.key,
                style: "width:50px;height:50px",
              },
            });
          },
        },
        {
          title: "大小",
          align: "center",
          render: (h, params) => {
            let temp = params.row.putTime + "";
            return h("span", this.formatFsize(params.row.fsize));
          },
        },
        {
          title: "类型",
          align: "center",
          key: "mimeType",
        },
        {
          title: "修改时间",
          align: "center",
          render: (h, params) => {
            let temp = params.row.putTime + "";
            return h("span", this.formateDate(parseInt(temp.slice(0, temp.length - 4))));
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
    this.getQiniuList(this.params);
  },
  methods: {
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
    // 格式化文件大小
    formatFsize(val) {
      let res;
      res = (val / 1024).toFixed(2);
      if (res > 1024) {
        res = (res / 1024).toFixed(2);
        return res + "MB";
      }
      return res + "KB";
    },
    beforeChangeStatus(v, row) {
      // editArticle({ ...row, is_comment: v ? 1 : 0, tags: tagTemp }).then((res) => {
      //   this.$Message.success({
      //     content: res.message,
      //   });
      //   this.getArticleList(this.params);
      // });
    },
    changeStatus(v, row) {
      console.log(v);
      console.log(row);
      console.log("changeStatus");
      let tagTemp = [];
      editLink({ ...row, status: v ? 1 : 0 }).then((res) => {
        this.$Message.success({
          content: res.message,
        });
        this.getLinkPageList(this.params);
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
          {
            name: "链接",
            type: "Input",
            prop: "url",
            placeholder: "请输入友链链接",
            required: true,
          },

          // {
          //   name: "创建时间",
          //   type: "Date",
          //   prop: "createdAt",
          //   isDate: true,
          //   placeholder: "请选择创建时间",
          //   required: true,
          // },
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
      await editLink(v).then((res) => {
        console.log(res);
        this.$Message.success({
          content: res.message,
        });
        this.getLinkPageList({ ...this.params });
      });
    },
    onSearch(v) {
      console.log(v);
      console.log("!!!!!!!!!");
      // this.getLinkPageList(v);
    },
    changePage(v) {
      console.log(v);
      this.getLinkPageList(v);
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
    getQiniuList(v) {
      let that = this;
      getQiniuList(v).then((res) => {
        console.log(res);
        // if (res.respInfo.data.items.length < this.params.limit) {
        //   this.flag == false;
        // }
        console.log(res.respInfo.data.marker);
        if (!res.respInfo.data.marker) {
          console.log("!!!!!!!");
          that.flag = false;
        }
        this.linkList.push(...res.respInfo.data.items);
        this.params.marker = res.respInfo.data.marker;
      });
    },
  },
};
</script>

<style scoped></style>
