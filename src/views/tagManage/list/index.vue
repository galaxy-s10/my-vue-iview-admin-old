<template>
  <div>
    <div v-if="tableData.list">
      <hss-table
        :tableData="tableData"
        :columns="columns"
        :params="params"
        @changePage="changePage"
      ></hss-table>
    </div>
    <!-- <hss-table v-if="tableData.list.length>0" :tableData="tableData" :columns="columns" :params="params"></hss-table> -->
  </div>
</template>

<script>
import { taglist, tagPageList } from "../../../api/tag";
import hssTable from "../../../components/hssComponents/table";
export default {
  components: { hssTable },
  data() {
    return {
      tableData: {
        list: "",
        count: "",
      },
      params: {
        count: 0,
        pageSize: 10,
        nowPage: 1,
      },
      columns: [
        {
          title: "id",
          key: "id",
          align: "center",
        },
        {
          title: "名称",
          align: "center",
          key: "name",
          // render: (h, params) => {
          //   console.log(params);
          //   return h("span", params.row.title);
          // },
        },
        {
          title: "颜色",
          align: "center",
          key: "color",
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
          slot: "operation",
          width: 400,
        },
      ],
    };
  },
  computed: {},
  created() {
    // this.getTagList();
  },
  mounted() {
    this.getTagPageList();
  },
  methods: {
    changePage(v) {
      this.getTagPageList(v);
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
    async getTagPageList() {
      await tagPageList(this.params).then((res) => {
        console.log(res);
        this.tableData.list = res.rows;
        this.tableData.count = res.count;
      });
    },
  },
};
</script>

<style scoped></style>
