<template>
  <div>
    <Layout>
      <Sider
        :style="{
          color: 'red',
          position: 'fixed',
          height: '100vh',
          left: 0,
          overflow: 'auto',
        }"
        hide-trigger
      >
        <div v-if="auth.length != 0">
          <Menu
            mode="vertical"
            width="200"
            theme="dark"
            @on-select="pushRouter"
            :active-name="activeName"
          >
            <template v-for="(item, index) in menuList">
              <Submenu
                v-if="item.children && item.children.length > 1"
                :name="item.name"
                :key="index"
                v-auth="item.authKey"
              >
                <template slot="title">
                  <Icon :type="item.meta.icon" />
                  {{ item.meta.title }}
                  <!-- {{ item.meta.title }} -->
                </template>
                <template v-for="(itemm, indexx) in item.children">
                  <MenuItem
                    :name="itemm.name"
                    :key="indexx"
                    v-auth="itemm.authKey"
                  >
                    {{ itemm.meta.title }}
                  </MenuItem>
                </template>
              </Submenu>

              <MenuItem
                v-if="item.children && item.children.length <= 1"
                :name="item.name"
                :key="index"
              >
                <Icon :type="item.meta.icon" />
                {{ item.meta.title }}
              </MenuItem>
            </template>
          </Menu>
        </div>
      </Sider>
      <Layout :style="{ marginLeft: '200px' }">
        <Header
          :style="{
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
          }"
        >
          Header
        </Header>
        <Content :style="{ padding: '0 16px 16px' }">
          <router-view></router-view>
        </Content>
        <Footer
          :style="{
            background: '#e74c3c',
            position: 'fixed',
            padding: '0',
            width: 'calc(100% - 200px)',
            bottom: 0,
            textAlign: 'center',
          }"
        >
          Footer
        </Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { roleRoutes } from "@/router/router";
// import Header from "./header/index";
// import Sider from "./sider/index";
// import Footer from "./footer/index";
import { mapState } from "vuex";
export default {
  //   components: {
  //     Header,
  //     Sider,
  //     Footer,
  //   },
  data() {
    return {
      menuList: [
        "ARTICLE_LIST",
        "ADD_ARTICLE",
        "UPDATE_ARTICLE",
        "SELECT_ARTICLE",
        "DELETE_ARTICLE",
      ],
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
    activeName() {
      return this.$route.name;
    },
  },
  methods: {
    pushRouter(path) {
      console.log(path)
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
    console.log(roleRoutes);
    console.log(this.$router.options.routes);
    // this.menuList = roleRoutes;
    this.menuList = this.$router.options.routes;
  },
};
</script>

<style scoped>
</style>