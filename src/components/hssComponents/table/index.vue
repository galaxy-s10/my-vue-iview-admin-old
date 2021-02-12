<template>
  <div>
    <!-- <Table
      border
      :loading="tableData.list && tableData.list.length == 0"
      :columns="columns"
      :data="tableData.list"
    ></Table> -->
    <div v-if="tableData.list && searchData.length">
      <hss-search
        :searchValue="searchData"
        @onSelect="onSelect"
        @onSearch="onSearch"
        v-model="searchResult"
        @changeSearch="changeSearch"
      ></hss-search>
    </div>

    <!-- <Table border :columns="columns" :data="tableData.list"> -->
    <Table :columns="columns" :data="tableData.list" :loading="!tableData.list">
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
      v-if="Object.keys(params).length != 0"
      style="text-align: right"
      :total="tableData.count"
      :current="params.nowPage"
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
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      searchResult: {},
    };
  },
  created() {
    console.log(this.searchData);
  },
  mounted() {},
  computed: {},
  watch: {
    searchData(newVal, oldVal) {
      console.log('searchDatasearchData')
      // this.$emit("changeSearchResult", newVal);
      // this.searchResult = newVal
    },
    searchResult(newVal, oldVal) {
      // this.$emit("changeSearchResult", newVal);
    },
    
  },
  methods: {
    changeSearch(v) {
      console.log(v);
      this.$emit("changeSearchResult", v);
    },
    onSelect(v) {
      this.$emit("onSelect", v);
    },
    onSearch(v) {
      console.log(v);
      // this.changePage(1);
      // console.log(this.paramsData);
      this.searchResult = v;
      // this.changePage(1, v);
      console.log({ ...v });
      this.$emit("onSearch", v);
    },
    changePage(nowPage) {
      console.log(nowPage);
      console.log({ ...this.searchResult });
      // this.paramsData.nowPage = nowPage;
      this.$emit("changePage", { ...this.params,nowPage, ...this.searchResult });
      // this.getArticleList(this.params);
    },
  },
};
</script>

<style scoped></style>
