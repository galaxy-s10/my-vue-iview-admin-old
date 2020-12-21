<template>
  <div>
    <Table
      border
      :loading="tableData.list && tableData.list.length == 0"
      :columns="columns"
      :data="tableData.list"
    ></Table>
    <Page
      style="text-align: right"
      :total="tableData.count"
      show-total
      show-elevator
      @on-change="changePage"
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {},
    params: {},
  },
  data() {
    return {
      paramsData: this.params,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    changePage(v) {
      console.log(v);
      this.paramsData.nowPage = v;
      this.$emit("changePage", this.paramsData);
      // this.getArticleList(this.params);
    },
  },
};
</script>

<style scoped></style>
