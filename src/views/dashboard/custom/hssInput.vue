<template>
  <div>
    <!-- 第一种情况（报警告），hssIptVal未定义在实例上 -->
    <!-- <input type="text" @input="changeIpt" :value="hssIptVal" /> -->
    <!-- 第二种情况 -->
    <input type="text" @input="changeIpt" :value="val" />
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: String,
      default: "",
    },
  },
  model: {
    prop: "hssIptVal",
    event: "hssChangeIpt",
  },
  data() {
    return {};
  },
  methods: {
    changeIpt(e) {
      console.log("子组件input");
      this.$emit("hssChangeIpt", e.target.value);
    },
  },
};
</script>
