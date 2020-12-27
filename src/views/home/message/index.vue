<template>
  <div>
    是否开放留言板
    <i-switch v-model="front_comment" @on-change="change" />
  </div>
</template>

<script>
import { getFront, updateFront } from "@/api/front";
export default {
  components: {},
  data() {
    return {
      front_comment: true,
    };
  },
  computed: {},
  methods: {
    getFront() {
      getFront().then((res) => {
        console.log(res);
        this.front_comment = res.detail.front_comment ? true : false;
      });
    },

    change(status) {
      updateFront({ id: 1, front_comment: status ? 1 : 0 }).then((res) => {
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
