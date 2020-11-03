<template>
  <div>
    <div>
      当前权限：
      <span v-for="(item, index) in roles" :key="index">{{ item }},</span>
    </div>
    <div>
      <div>
        ARTICLE_LIST
        <i-switch
          :value="checkRole('ARTICLE_LIST')"
          @on-change="(e) => change(e, 'ARTICLE_LIST')"
        ></i-switch>
      </div>
      <div>
        ADD_ARTICLE
        <i-switch
          :value="checkRole('ADD_ARTICLE')"
          @on-change="(e) => change(e, 'ADD_ARTICLE')"
        ></i-switch>
      </div>
      <div>
        DELETE_ARTICLE
        <i-switch
          :value="checkRole('DELETE_ARTICLE')"
          @on-change="(e) => change(e, 'DELETE_ARTICLE')"
        ></i-switch>
      </div>
      <div>
        UPDATE_ARTICLE
        <i-switch
          :value="checkRole('UPDATE_ARTICLE')"
          @on-change="change($event, 'UPDATE_ARTICLE')"
        ></i-switch>
      </div>
      <div>
        SELECT_ARTICLE
        <i-switch
          :value="checkRole('SELECT_ARTICLE')"
          @on-change="change($event, 'SELECT_ARTICLE')"
        ></i-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      roles: [
        "ARTICLE_LIST",
        "ADD_ARTICLE",
        "UPDATE_ARTICLE",
        "SELECT_ARTICLE",
        "DELETE_ARTICLE",
      ],
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
      this.$router.push({ name: path });
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
    console.log(this.$router.options.routes);
  },
};
</script>


<style scoped>
</style>