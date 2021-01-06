<template>
  <div>
    <div>
      <Spin v-if="loading"></Spin>
      <div>
        是否开放登录
        <i-switch
          :value="params.frontend_login == 1"
          @on-change="(v) => change.call(null, 'xx')"
        />
      </div>
      <div>
        是否开放注册
        <i-switch
          :value="params.frontend_register == 1"
          @on-change="change('frontend_register')"
        />
      </div>
      <div>
        是否开放留言板
        <i-switch
          :value="params.frontend_comment == 1"
          @on-change="change('frontend_comment')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getFrontend, updateFrontend } from "@/api/frontend";
export default {
  components: {},
  data() {
    return {
      params: {
        // frontend_register: true,
        // frontend_login: true,
        // frontend_comment: true,
      },
      loading: false,
    };
  },
  computed: {},
  methods: {
    getFrontend() {
      getFrontend().then((res) => {
        console.log(res);
        this.params = res.detail;
      });
    },

    change(status) {
      this.loading = true;
      console.log(status);
      // updateFrontend({ id: 1, frontend_register: status ? 1 : 0 }).then((res) => {
      //   console.log(res);
      //   this.$Message.success(res.message);
      //   this.getFrontend();
      //   setTimeout(() => {
      //     this.loading = false;
      //   }, 500);
      // });
    },
  },
  created() {},
  mounted() {
    this.getFrontend();
  },
};
</script>

<style scoped></style>
