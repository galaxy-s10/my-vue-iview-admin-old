<template>
  <div>
    是否开放登录
    <i-switch v-model="front_login" @on-change="change" />
  </div>
</template>

<script>
import { getFront, updateFront } from "@/api/front";
export default {
  components: {},
  data() {
    return {
      front_login: true,
    };
  },
  computed: {},
  methods: {
    getFront() {
      getFront().then((res) => {
        console.log(res);
        this.front_login = res.detail.front_login ? true : false;
      });
    },

    change(status) {
      updateFront({ id: 1, front_login: status ? 1 : 0 }).then((res) => {
        console.log(res);
        this.$Message.success(res.message);
        this.getFront();
      });
    },
  },
  created() {},
  mounted() {
    this.getFront();
  },
};
</script>

<style scoped></style>
