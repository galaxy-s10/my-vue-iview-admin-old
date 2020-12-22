<template>
  <div>
    <template v-for="(item, i) in operationList">
      <!-- <template>
        <a @click="onClick(item)" :style="item.style">{{ item.name[0] }}</a>
      </template> -->
      <template>
        <a @click="onClick(item)" :style="item.style">{{ item.name }}</a>
      </template>
      <Divider type="vertical" v-if="operationList.length != i + 1" />
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    operation: {
      type: Array,
      default: () => [],
    },
    row: {
      type: Object,
      default: () => {},
      // required: true,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    operationList() {
      let list = [];
      this.operation.forEach((item) => {
        // 自定义样式
        if (item.customStyle) {
          item.style = item.customStyle(this.row);
        }
        // 执行isShow()不为false就显示（isShow变量未定义或执行isShow返回true都显示，只有执行isShow()返回false不显示）
        if (!item.isShow || item.isShow(this.row)) {
          list.push(item);
        }
      });
      return list;
    },
  },
  methods: {
    onClick(item) {
      let that = this;
      switch (item.type) {
        case "CUSTOM":
          item.custom(this.row);
          break;
      }
    },
  },

  watch: {},
};
</script>

<style scoped>
</style>