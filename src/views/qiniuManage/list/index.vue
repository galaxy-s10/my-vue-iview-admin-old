<template>
  <div>
    <!-- <div v-if="tableData.list"> -->
    <div style="margin-bottom: 10px"></div>
    <div style="margin-bottom: 10px; display: flex; justify-content: space-between">
      <div style="display: flex; align-items: center">
        <div style="margin-right: 10px">当前总文件数：{{ QiniuList.length }}</div>
        <div>
          分页大小:
          <Select
            v-model="params.limit"
            style="width: 200px"
            placeholder="请选择分页大小"
            @on-change="onSelect"
          >
            <Option v-for="item in pageLimit" :value="item.value" :key="item.value">{{
              item.label
            }}</Option>
          </Select>
        </div>
      </div>
      <div style="width: 300px; display: flex; justify-content: space-between">
        <div style="width: 200px">
          <i-input
            @input="changePrefix"
            placeholder="请输入文件名前缀"
            clearable
          ></i-input>
        </div>
        <i-button type="info" @click="QiniuSearch">搜索</i-button>
      </div>
    </div>

    <hss-table :tableData="{ list: QiniuList }" :columns="columns">
      <template slot-scope="{ row }" slot="operation">
        <hss-operation :row="row" :operation="operationData"></hss-operation>
      </template>
    </hss-table>
    <!-- </div> -->
    <div style="text-align: center; height: 40px; line-height: 40px; font-size: 16px">
      <span style="color: #00aae7; cursor: pointer" @click="loadMore">{{
        flag ? "加载更多" : "已加载全部"
      }}</span>
    </div>

    <component
      v-bind:is="comments"
      :request="request"
      :fromData="columnForm"
      :initData="qiniuData"
      :isInit="isInit"
      @on-cancel="onCancel"
      @on-ok="onOk"
    ></component>
    <button @click="insert">sss</button>
    <!-- <hss-table v-if="tableData.list.length>0" :tableData="tableData" :columns="columns" :params="params"></hss-table> -->
  </div>
</template>

<script>
// import { format } from "../../../../../webchat/src/utils/format";
// import { linkPageList, editLink, delLink } from "../../../api/link";
import {
  getQiniuToken,
  getQiniuList,
  updateQiniu,
  deleteQiniu,
  insertQiniu,
} from "@/api/qiniu";
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
      QiniuList: [],
      tableData: {
        list: "",
        count: "",
      },
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
                  type: "Input",
                  name: "文件名",
                  prop: "key",
                  placeholder: "请输入文件名",
                  required: true,
                },
                {
                  name: "大小",
                  type: "Input",
                  isNumber: true,
                  prop: "fsize",
                  disabled: true,
                  required: true,
                },
                {
                  name: "类型",
                  type: "Input",
                  prop: "mimeType",
                  disabled: true,
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
            deleteQiniu(row.key).then((res) => {
              this.$Message.success({
                content: res.message,
              });
              this.getQiniuList({ ...this.params, marker: "" }).then((res) => {
                this.QiniuList = res;
              });
            });
          },
          isShow() {
            return 1;
          },
        },
      ],
      params: {
        // count: 0,
        limit: 10,
        prefix: "", //前缀
        marker: "",
      },
      columns: [
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
          title: "最后修改",
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
  async mounted() {
    let res = await this.getQiniuList(this.params);
    this.QiniuList = res;
  },
  methods: {
    async insert() {
      for (let i = 0; i < this.QiniuList.length; i++) {
        // console.log(QiniuList);
        await insertQiniu(this.QiniuList[i])
      }
    },
    async onSelect() {
      this.params.marker = "";
      this.QiniuList = [];
      let res = await this.getQiniuList(this.params);
      this.QiniuList = res;
    },
    async QiniuSearch() {
      this.params.marker = "";
      this.QiniuList = [];
      let res = await this.getQiniuList(this.params);
      this.QiniuList = res;
    },
    changePrefix(e) {
      console.log(e);
      this.params.prefix = e;
    },
    async loadMore() {
      if (this.flag) {
        let res = await this.getQiniuList(this.params);
        console.log(res);
        this.QiniuList.push(...res);
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
    onCancel() {
      console.log("onCancel");
      this.roleInfo = {};
      this.comments = "";
    },
    onOk() {
      this.comments = "";
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
    async getQiniuList(v) {
      let res = await getQiniuList(v);
      // .then((res) => {
      //   console.log(res);
      //   console.log(res.respInfo.data.marker);
      //   if (!res.respInfo.data.marker) {
      //     console.log("!!!!!!!");
      //     that.flag = false;
      //   } else {
      //     that.flag = true;
      //   }
      //   this.QiniuList.push(...res.respInfo.data.items);
      //   this.params.marker = res.respInfo.data.marker;
      // });
      if (!res.respInfo.data.marker) {
        console.log("!!!!!!!");
        this.flag = false;
      } else {
        this.flag = true;
      }
      this.params.marker = res.respInfo.data.marker;
      // this.QiniuList = res.respInfo.data.items;
      return res.respInfo.data.items;
    },
  },
};
</script>

<style scoped></style>
