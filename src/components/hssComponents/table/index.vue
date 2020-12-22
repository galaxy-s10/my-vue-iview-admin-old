<template>
  <div>
    <!-- <Table
      border
      :loading="tableData.list && tableData.list.length == 0"
      :columns="columns"
      :data="tableData.list"
    ></Table> -->
    <Table border :columns="columns" :data="tableData.list">
      <template
        v-for="(col, colIndex) in columns"
        v-if="col.slot"
        slot-scope="{ row, column, index }"
        :slot="col.slot"
      >
        <table-slot :row="row" :column="column" :index="index"></table-slot>
      </template>
    </Table>
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
import tableSlot from "./render.js";
export default {
  components: { tableSlot },
  provide() {
    return {
      demoSlot: this,
    };
  },
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
