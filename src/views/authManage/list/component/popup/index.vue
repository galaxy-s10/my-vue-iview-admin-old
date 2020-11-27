<template>
  <div>
    sss
    <Modal v-model="isShow" :title="title" @on-ok="ok" @on-cancel="cancel">
      <slot></slot>
    </Modal>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
  },
  data() {
    return {
      //   isShow: true,
      //   title: "fasfsdaf",
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    ok() {},
    cancel() {},
  },
};
</script>

<style scoped>
</style>