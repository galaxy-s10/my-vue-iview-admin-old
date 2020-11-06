<template>
  <div>
    <Tag
      v-for="(item, index) in tagOpenPageList"
      :key="index"
      type="dot"
      closable
      :color="active ? 'primary' : '#e8eaec'"
      >{{ item.meta.title }}</Tag
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      active: true,
    };
  },
  computed: {
    ...mapState({
      tagOpenPageList(state) {
        // console.log("state.auth.auth");
        // console.log(state.auth.auth);
        // console.log(this.menuList);
        // console.log(state.auth.auth == this.menuList);
        return state.app.tagOpenPageList;
      },
    }),
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
</style>