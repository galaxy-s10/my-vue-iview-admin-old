<template>
  <div>
    <!-- 第一种情况（报警告），将val作为hssIpt的model里hssIptVal的值 -->
    <!-- <hss-input v-model="val"></hss-input> -->
    <!-- 第二种情况 -->
    <hss-input :val="val" v-model="val" ref="form1"></hss-input>
    <!-- 等价于 -->
    <!-- <hss-input :val="val" v-model="val" @hssChangeIpt="input1"></hss-input> -->
    <!-- 等价于 -->
    <!-- <hss-input :val="val" :hssIptVal="val" @hssChangeIpt="input2"></hss-input> -->
    <!-- 等价于 -->
    <!-- <hss-input
      :val="val"
      :hssIptVal="val"
      @hssChangeIpt="
        (v) => {
          val = v;
        }
      "
    ></hss-input> -->

    <i-button @click="ppp">ppp</i-button>
    <i-button @click="modal1">a</i-button>
    <hss-modal :val="modalVal" @hssModalOk="ok" @hssModalCancel="cancel"></hss-modal>
  </div>
</template>

<script>
import hssInput from "./custom/hssInput";
import hssModal from "./custom/hssModal";
export default {
  components: { hssInput, hssModal },
  data() {
    return {
      val: "10",
      modalVal: false,
    };
  },
  methods: {
    ppp() {
      this.$refs.form1.handleSubmit((x) => {
        console.log("ooo");
        console.log(x);
      });
      // console.log(this.$refs.form1.handleSubmit())
      // console.log(this.$refs.form1.handleSubmit(x=>{
      //   console.log(x)
      // }))
      console.log("最后");
    },
    ok() {
      console.log("ok");
      this.modalVal = false;
    },
    cancel() {
      console.log("cancel");
      this.modalVal = false;
    },
    modal1() {
      console.log("object");
      this.modalVal = !this.modalVal;
    },
    input1(v) {
      console.log("父组件input");
      // do some things
    },
    input2(v) {
      console.log("父组件input");
      //必须，因为这相当于传统的父子传值，子组件的val和hssIptVal都依赖父组件的val
      this.val = v;
      // do some things
    },
  },
};
</script>
