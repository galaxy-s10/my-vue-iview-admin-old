<template>
  <div>
    是否开放注册
    <i-switch v-model="front_register" @on-change="change" />
  </div>
</template>

<script>
import { getFront, updateFront } from "@/api/front";
export default {
  components: {},
  data() {
    return {
      front_register: true,
    };
  },
  computed: {},
  methods: {
    getFront() {
      getFront().then((res) => {
        console.log(res);
        this.front_register = res.detail.front_register ? true : false;
      });
    },

    change(status) {
      updateFront({ id: 1, front_register: status ? 1 : 0 }).then((res) => {
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
