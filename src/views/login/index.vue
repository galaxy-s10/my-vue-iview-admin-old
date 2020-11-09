<template>
  <div>
    <div class="wrap">
      <div class="login">
        <i-form ref="formInline" :model="formInline" :inline="false">
          <FormItem prop="user">
            <i-input
              type="text"
              v-model="formInline.user"
              placeholder="Username"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input
              type="password"
              v-model="formInline.password"
              placeholder="Password"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit">Signin</Button>
          </FormItem>
        </i-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "@/api/auth";
export default {
  components: {},
  data() {
    return {
      formInline: {
        user: "hss",
        password: "19990507a",
      },
      redirect: "",
    };
  },
  computed: {},
  watch: {
    $route: {
      handler: function (route) {
        console.log(route);
        this.redirect = route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      getAuth(1).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      // console.log(this.redirect);
      // this.$router.push({ path: this.redirect });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.wrap {
  display: flex;
  /* width: 100%; */
  height: 100vh;
  background: #f5f7f9;
}
.login {
  width: 320px;
  margin: auto;
}
</style>