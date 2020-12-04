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
/*滚动条*/
::-webkit-scrollbar {
  /* 这个width决定纵向滚动条宽度 */
  width: 10px;
  /* 这个width决定横向滚动条宽度 */
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  /* background: skyblue; */
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
