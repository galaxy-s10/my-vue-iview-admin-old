<template>
  <div>
    <!-- <Table
      border
      :loading="tableData.list && tableData.list.length == 0"
      :columns="columns"
      :data="tableData.list"
    ></Table> -->
    <div v-if="searchData">
      <hss-search
        :searchValue="searchData"
        @onSelect="onSelect"
        @onSearch="onSearch"
        v-model="searchResult"
      ></hss-search>
    </div>

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
import hssSearch from "./search";
import tableSlot from "./render.js";
export default {
  components: { tableSlot, hssSearch },
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
    searchData: {
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
      searchResult: {},
      paramsData: this.params,
      // searchData: [
      //   {
      //     type:"Select",
      //     key:"iii",
      //     placeholder: '提交时间',
      //   }
      // ],
    };
  },
  created() {
    console.log(this.searchData);
  },
  mounted() {},
  computed: {},
  methods: {
    onSelect() {
      this.$emit("onSelect");
    },
    onSearch(v) {
      console.log(v)
      this.$emit("onSearch");
    },
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
