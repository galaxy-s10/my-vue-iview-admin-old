<template>
  <div>
    <div>
      当前权限：
      <span v-for="(item, index) in auth" :key="index">{{ item }},</span>
    </div>
    <div>
      文章权限：
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
    <hr />
    <div>
      标签权限：
      <div>
        TAG_LIST
        <i-switch
          :value="checkRole('TAG_LIST')"
          @on-change="(e) => change(e, 'TAG_LIST')"
        ></i-switch>
      </div>
      <div>
        ADD_TAG
        <i-switch
          :value="checkRole('ADD_TAG')"
          @on-change="(e) => change(e, 'ADD_TAG')"
        ></i-switch>
      </div>
      <div>
        DELETE_TAG
        <i-switch
          :value="checkRole('DELETE_TAG')"
          @on-change="(e) => change(e, 'DELETE_TAG')"
        ></i-switch>
      </div>
      <div>
        UPDATE_TAG
        <i-switch
          :value="checkRole('UPDATE_TAG')"
          @on-change="change($event, 'UPDATE_TAG')"
        ></i-switch>
      </div>
      <div>
        SELECT_TAG
        <i-switch
          :value="checkRole('SELECT_TAG')"
          @on-change="change($event, 'SELECT_TAG')"
        ></i-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      // roles: [
      //   "ARTICLE_LIST",
      //   "ADD_ARTICLE",
      //   "UPDATE_ARTICLE",
      //   "SELECT_ARTICLE",
      //   "DELETE_ARTICLE",
      // ],
      path: "",
    };
  },
  computed: {
    ...mapState({
      auth(state) {
        console.log("state.auth.auth");
        console.log(state.auth.auth);
        console.log(this.menuList);
        console.log(state.auth.auth == this.menuList);
        return state.auth.auth;
      },
    }),
    checkRole() {
      return (v) => {
        console.log(this.auth.includes(v));
        return this.auth.includes(v);
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