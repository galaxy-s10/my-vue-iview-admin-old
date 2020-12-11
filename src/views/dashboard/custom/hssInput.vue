<template>
  <div>
    <input type="text" @input="changeIpt" :value="num" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    num: {
      type: Number,
      default: 0,
    },
  },
  model: {
    prop: "vals",
    event: "input",
  },
  data() {
    return {
      val: 10,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    changeIpt(e) {
      console.log(e.target.value);
      this.$emit("input", e.target.value);
    },
  },
  watch: {},
};
</script>

<style scoped>
</style>