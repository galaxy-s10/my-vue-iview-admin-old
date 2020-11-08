<template>
  <div>
    <router-view></router-view>
    <!-- <i-button @click="changePath('login')">login</i-button> -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      roles: ["add", "del"],
      path: "",
    };
  },
  computed: {
    checkRole() {
      return (v) => {
        return this.roles.includes(v);
      };
    },
  },
  methods: {
    changePath(path) {
      this.$router.push({name:path})
    },
    change(e, role) {
      if (e) {
        if (!this.roles.includes(role)) {
          this.roles.push(role);
        }
      } else {
        const index = this.roles.findIndex((item) => item === role);
        this.roles.splice(index, 1);
      }
    },
  },
  created() {},
  mounted() {
    // console.log(this.$router.options.routes);
  },
};
</script>

<style>
</style>
