<template>
  <!-- <div> -->
  <div style="display: flex; width: 100%">
    <div
      style="
        display: flex;
        width: 90%;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
      "
    >
      <div v-for="(item, index) in searchValue" style="margin: 0 10px 10px">
        <DatePicker
          v-if="item.type == 'DateTime'"
          v-model="item.val"
          type="datetime"
          :options="item.options"
          :placeholder="item.placeholder"
        ></DatePicker>
        <DatePicker
          v-else-if="item.type == 'Month'"
          v-model="item.val"
          type="month"
          :options="item.options"
          :placeholder="item.placeholder"
        ></DatePicker>
        <DatePicker
          v-else-if="item.type == 'DateTimeRange'"
          v-model="item.val"
          type="datetimerange"
          :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
          :options="item.options"
          :placeholder="item.placeholder"
          :style="{ width: item.width + 'px' }"
        ></DatePicker>
        <Select
          v-else-if="item.type == 'Select'"
          v-model="item.val"
          :placeholder="item.placeholder"
          clearable
          @on-select="onSelect"
          :style="{ width: item.width + 'px' }"
        >
          <Option v-for="(el, i) in item.data" :value="el.value" :key="i">{{
            el.label
          }}</Option>
        </Select>
        <Input
          :style="{ width: item.width + 'px' }"
          v-else
          v-model="item.val"
          :placeholder="item.placeholder"
          clearable
        />
      </div>
    </div>
    <div>
      <i-button style="margin-left: 10px" type="info" @click="handleSearch"
        >搜索</i-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // searchValue: [],
    searchValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  model: {
    prop: "searchValue1",
    event: "changeSearch",
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onSelect(v) {
      this.$emit("onSelect", v);
    },
    handleSearch() {
      let temp = {};
      this.searchValue.forEach((item) => {
        if (item.val) {
          temp[item.key] = item.val;
        }
      });
      console.log(temp);
      this.$emit("onSearch", temp);
    },
  },
};
</script>

<style scoped></style>
