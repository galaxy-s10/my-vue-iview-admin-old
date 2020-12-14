<template>
  <div>
    <Modal
      v-model="popup.is_show"
      :title="popup.title"
      :width="popup.width"
      :mask-closable="false"
      @on-visible-change="onVisibleChange"
    >
      <template slot="footer">
        <i-button type="text" @click.native="cancel">取消</i-button>
        <i-button type="primary" @click.native="ok">确定</i-button>
      </template>
      <base-form
        ref="hssBaseFrom"
        :fromData="fromData"
        :initData="initData"
        :init="isInit"
      ></base-form>
    </Modal>
  </div>
</template>

<script>
import baseForm from "../base-form/index";
export default {
  components: { baseForm },
  props: {
    request: {
      type: Object,
    },
    fromData: {
      type: Object,
      default: () => {},
    },
    initData: {
      type: Object,
      default: () => {},
    },
    isInit: {
      type: Boolean,
      default: () => {},
    },
  },
  data() {
    return {
      popup: {},
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {},
  methods: {
    init() {
      /*初始化弹窗*/
      this.popup = {
        is_show: true,
        title: this.request.title ? this.request.title : "",
        width:
          this.request.size == "small" ? 300 : this.request.size == "centre" ? 520 : 900,
      };
    },
    ok() {
      console.log("hss-ok");
      // this.popup.is_show = false;

      this.$refs.hssBaseFrom.submit((v) => {
        console.log('ppp');
        console.log(v);
      });
      // console.log(data);
      console.log("最后");
      // this.$emit("on-ok");
    },
    cancel() {
      console.log("hss-cancel");
      this.popup.is_show = false;
      this.$emit("on-cancel");
    },
    onVisibleChange() {
      // this.popup.is_show = false;
      // this.$emit("on-cancel");
      console.log("hss-onVisibleChange");
    },
  },
  watch: {
    data() {
      this.init();
    },
  },
};
</script>

<style scoped></style>
