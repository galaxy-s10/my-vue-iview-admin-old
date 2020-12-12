<template>
  <div>
    <Modal
      v-model="val2"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "hssIptVal",
    event: "hssChangeModal",
  },
  data() {
    return {
      val2: this.val,
    };
  },
  watch: {
    val(newval) {
      this.val2 = this.val;
    },
  },
  computed: {
    vall: {
      get() {
        return this.val;
      },
      set() {},
    },
  },
  methods: {
    changeIpt(e) {
      console.log("子组件modal");
      this.$emit("hssChangeModal", e.target.value);
    },
    ok(e) {
      console.log("子组件modal,ok");
      console.log(e);
      this.$emit("hssModalOk");
    },
    cancel(e) {
      console.log("子组件modal,cancel");
      this.$emit("hssModalCancel");
    },
  },
};
</script>
