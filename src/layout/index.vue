<template>
  <div>
    <Layout :style="{ height: '100vh' }" class="slider-menu">
      <Sider
        width="200"
        :collapsed-width="70"
        collapsible
        v-model="isCollapsed"
        hide-trigger
      >
        <!-- <Sider width="200" collapsible v-model="isCollapsed"> -->
        <!-- <div v-if="auth.length != 0"> -->
        <div style="height: 100vh; overflow-y: scroll">
          <div class="logo">
            {{ title }}
          </div>
          <side-bar-item :menuList="menuList"></side-bar-item>
          <Row
            type="flex"
            justify="center"
            align="middle"
            class="code-row-bg"
            style="
              z-index: 999;
              color: white;
            "
          >
            <p style="height: 75px"></p>
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{
                margin: '0 20px',
                transform: !isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
              }"
              type="ios-arrow-back"
              size="20"
            ></Icon>
          </Row>
        </div>
      </Sider>
      <!-- <Layout :style="{overflowX:'auto'}"> -->
      <Layout ref="scrollWrap">
        <Header
          :style="{
            padding: '0',
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
          }"
        >
          <div style="position: relative; display: flex; align-items: center">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{
                margin: '0 20px',
                transform: !isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
              }"
              type="md-menu"
              size="24"
            ></Icon>
            <Breadcrumb>
              <!-- <BreadcrumbItem
                v-for="(item, index) in breadList"
                :key="index"
                :to="item.path"
                >{{ item.meta.title }}</BreadcrumbItem
              > -->
              <BreadcrumbItem v-for="(item, index) in breadList" :key="index">{{
                item.meta.title
              }}</BreadcrumbItem>
            </Breadcrumb>
            <div style="position: absolute; right: 10px">
              <Dropdown style="margin-left: 20px" trigger="click">
                <a href="javascript:void(0)">
                  {{ username }}
                  <Icon type="md-arrow-dropdown" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem
                    ><a href="https://www.zhengbeining.com/" target="_bank"
                      >网站前台</a
                    >
                  </DropdownItem>
                  <DropdownItem divided @click.native="goProfile"
                    >个人信息</DropdownItem
                  >
                  <DropdownItem divided @click.native="logout">
                    退出登录
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar size="large" shape="square" :src="avatar" />
            </div>
          </div>
        </Header>
        <Content>
          <tag-open-page ref="tagOpen"></tag-open-page>
          <div class="main-content">
            <router-view></router-view>
          </div>
        </Content>

        <Footer
          :style="{
            background: '#e74c3c',
            padding: 0,
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
// import treeItem from "./treeItem";
import sideBarItem from "./sideBarItem";
import utils from "../libs/utils";
import TagOpenPage from "../components/tagOpenPage";
import { roleRoutes } from "@/router/router";
// import Header from "./header/index";
// import Sider from "./sider/index";
// import Footer from "./footer/index";
import { mapState, mapMutations } from "vuex";
import cache from "@/libs/cache";
export default {
  components: {
    TagOpenPage,
    // treeItem,
    sideBarItem,
    // Header,
    // Sider,
    // Footer,
  },
  data() {
    return {
      isCollapsed: false,
      menuList: [],
      // menuList: [
      //   "ARTICLE_LIST",
      //   "ADD_ARTICLE",
      //   "UPDATE_ARTICLE",
      //   "SELECT_ARTICLE",
      //   "DELETE_ARTICLE",
      // ],
      breadList: [],
    };
  },
  computed: {
    ...mapState("user", ["username", "avatar"]),
    // ...mapState("app", {
    //   title: (state) => state.title,
    // }),
    ...mapState({
      title(state) {
        // console.log("titletitle");
        // console.log(state);
        return state.app.title;
      },
      auth(state) {
        // console.log("state.auth.auth");
        // console.log(state);
        // console.log(this.menuList);
        // console.log(state.auth.auth == this.menuList);
        // return state.auth;
      },
      tagList(state) {
        return state.app.tagOpenPageList;
      },
    }),
    activeName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  methods: {
    goProfile() {
      this.$router.push({ name: "profile" });
    },
    logout() {
      cache.clearStorage("token");
      this.$router.push({ path: `/login?redirect=${this.$route.path}` });
    },
    ...mapMutations(["addTagOpenPage", "changeActiveTagOpenPage"]),
    // ...mapMutations("app", ["addTagOpenPage"]),
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed;
    },
    findItem(source, target) {
      var res = false;
      function digui(source, target) {
        let ress = "";
        try {
          source.forEach((item) => {
            if (item.name == target) {
              ress = item;
              throw new Error();
            } else {
              if (item.children) {
                digui(item.children, target);
              }
            }
          });
        } catch (e) {
          res = ress;
        }
      }
      digui(source, target);
      return res;
    },
    changeMenu(name) {
      // 判断当前跳转页面有没有在tagOpenPageList里面
      // 查询点击跳转的路由信息
      console.log("查询点击跳转的路由信息");
      console.log(name);
      // this.$router.push({ name: name });
      return;
      let target = this.findItem(this.menuList, name);
      let tag;
      let bool = utils.exist(this.tagList, name);
      if (!bool) {
        console.log("点击判断，没有就插入1");
        console.log(target);
        this.addTagOpenPage(target);
        this.changeActiveTagOpenPage(target.name);
      } else {
        this.changeActiveTagOpenPage(target.name);
      }
      this.$router.push({ name: name });
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    change(e, role) {
      console.log("changechange");
      if (e) {
        if (!this.roles.includes(role)) {
          this.roles.push(role);
        }
      } else {
        const index = this.roles.findIndex((item) => item === role);
        this.roles.splice(index, 1);
      }
    },
    getBreadcrumb() {
      // console.log('[[[[[[[[]]]]]]]]')
      // console.log(this.$route.matched)
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      // console.log(
      //   this.$route.matched.filter((item) => item.meta && item.meta.title)
      // );
      // console.log(matched[0]);
      // console.log(this.$route.matched);
      // console.log('】】】】】】】】】】】】】】】】】】】】】】】】】')
      // console.log(matched)
      console.log(matched);
      this.breadList = matched;
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  // beforeDestroy() {
  // this.$bus.$off("overScroll");
  // },
  mounted() {
    let that = this;
    this.$refs.scrollWrap.$el.addEventListener("scroll", function () {
      // console.log(document.documentElement.offsetHeight)
      // 滚动条高度
      // console.log(that.$refs.scrollWrap.$el.scrollHeight);
      // 滚动距离
      // console.log(that.$refs.scrollWrap.$el.scrollTop);
      // 盒子高度
      // console.log(that.$refs.scrollWrap.$el.offsetHeight);
      // console.log(that.$refs.scrollWrap.$el.scrollHeight);
      // console.log(
      //   that.$refs.scrollWrap.$el.scrollTop + that.$refs.scrollWrap.$el.offsetHeight
      // );
      // console.log(
      //   that.$refs.scrollWrap.$el.scrollHeight -
      //     (that.$refs.scrollWrap.$el.scrollTop + that.$refs.scrollWrap.$el.offsetHeight)
      // );
      if (
        that.$refs.scrollWrap.$el.scrollHeight -
          (that.$refs.scrollWrap.$el.scrollTop +
            that.$refs.scrollWrap.$el.offsetHeight) <
        100
      ) {
        // console.log("距离底部少于100px");
        // that.$bus.$emit("overScroll");
      }
      // console.log(that.$refs.scrollWrap.$el.scrollTop+that.$refs.scrollWrap.$el.offsetHeight);
      // console.log(
      //   that.$refs.scrollWrap.$el.scrollHeight -
      //     that.$refs.scrollWrap.$el.pageYOffset -
      //     that.$refs.scrollWrap.$el.innerHeight
      // );
    });
    // console.log(this.$refs.tagOpen.$el);
    // let width = this.$refs.tagOpen.$el.clientWidth;
    // console.log(width);
    // if (this.isCollapsed) {
    //   width = width - 200;
    // }
    // console.log(width);
    // this.menuList = roleRoutes;
    let tree = [
      {
        name: "treeManage",
        // authKey: "ARTICLE_LIST",
        path: "/treeManage",
        component: () => import("@/views/testPage"),
        meta: {
          icon: "ios-podium-outline",
          title: "treeManage",
          authKey: "ARTICLE_LIST",
        },
      },
      {
        name: "xxx",
        path: "*",
        redirect: "/404",
        meta: {
          icon: "ios-podium-outline",
          title: "xxx",
        },
        component: () => import("@/views/error/401/index"),
      },
    ];
    // console.log(this.$router.options.routes);
    // this.$router.addRoutes(tree);
    // // this.$router.addRoutes(...tree);
    // console.log(this.$router.options.routes);
    // this.$router.options.routes.push(...tree);
    this.$store.dispatch("user/generateRoutes");
    console.log(this.$store.state.user.addRoutes);
    // this.menuList = this.$router.options.routes;
    this.$router.addRoutes(this.$store.state.user.addRoutes);
    this.menuList = this.$router.options.routes.concat(
      this.$store.state.user.addRoutes
    );
    console.log(this.menuList);
  },
};
</script>

<style scoped>
.slider-menu
  /deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-opened
  .ivu-menu-submenu-has-parent-submenu
  .ivu-menu-submenu-title {
  background: #515a6e;
}
.logo {
  color: white;
  width: 100%;
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}
.main-content {
  background: white;
  padding: 20px;
}
</style>
