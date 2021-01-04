<template>
  <div>
    是否开放注册
    <i-switch v-model="frontend_register" @on-change="change" />
  </div>
</template>

<script>
import { getFrontend, updateFrontend } from "@/api/frontend";
export default {
  components: {},
  data() {
    return {
      frontend_register: true,
    };
  },
  computed: {},
  methods: {
    getFrontend() {
      getFrontend().then((res) => {
        console.log(res);
        this.frontend_register = res.detail.frontend_register ? true : false;
      });
    },

    change(status) {
      updateFrontend({ id: 1, frontend_register: status ? 1 : 0 }).then((res) => {
        console.log(res);
        this.$Message.success(res.message);
        this.getFrontend();
      });
    },
  },
  created() {},
  mounted() {
    this.getFrontend();
  },
};
</script>

<style scoped></style>
