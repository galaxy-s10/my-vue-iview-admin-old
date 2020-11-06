<template>
  <div>
    <Tag
      v-for="(item, index) in tagOpenPageList"
      :key="index"
      type="dot"
      closable
      :color="activeColor(item.name)"
      @click.native="onChangeTag(item.name)"
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
      currentTag: null,
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
    activeColor() {
      return (v) => {
        console.log("0000", v);
        // console.log("999999999", this.$route.name);
        if (v == this.currentTag) {
          return "#41b883";
        } else {
          return "#e8eaec";
        }
      };
    },
  },
  watch: {
    $route() {
      this.currentTag = this.$route.name;
      console.log("999999999", this.$route.name);
      // this.getBreadcrumb();
    },
  },
  methods: {
    onChangeTag(v) {
      console.log(v);
      this.$router.push({ name: v });
    },
  },
  created() {
    this.currentTag = this.$route.name;
    console.log(this.currentTag);
  },
  mounted() {},
};
</script>

<style scoped>
</style>