<template>
  <div>
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible v-model="isCollapsed" :collapsed-width="78">
        <!-- <div v-if="auth.length != 0"> -->
        <Menu
          mode="vertical"
          width="100"
          theme="dark"
          @on-select="changeMenu"
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
                <span v-if="!isCollapsed">{{ item.meta.title }}</span>
              </template>
              <template v-for="(itemm, indexx) in item.children">
                <MenuItem
                  :name="itemm.name"
                  :key="indexx"
                  v-auth="itemm.authKey"
                >
                  <span v-if="!isCollapsed">{{ itemm.meta.title }}</span>
                </MenuItem>
              </template>
            </Submenu>

            <MenuItem
              v-if="item.children && item.children.length <= 1"
              :name="item.name"
              :key="index"
            >
              <Icon :type="item.meta.icon" />
              <span v-if="!isCollapsed">
                {{ item.meta.title }}
              </span>
            </MenuItem>
          </template>
        </Menu>
        <!-- </div> -->
      </Sider>
      <Layout :style="{ background: 'white' }">
        <Header
          :style="{
            padding: '0',
            background: '#fff',
            boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
          }"
        >
          <div style="display: flex; align-items: center">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{ margin: '0 20px' }"
              type="md-menu"
              size="24"
            ></Icon>
            <Breadcrumb>
              <BreadcrumbItem
                v-for="(item, index) in breadList"
                :key="index"
                :to="item.path"
                >{{ item.meta.title }}</BreadcrumbItem
              >
            </Breadcrumb>
          </div>
        </Header>
        <Content>
          <tag-open-page></tag-open-page>
          <router-view></router-view>
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
import utils from "../libs/utils";
import TagOpenPage from "../components/tagOpenPage";
import { roleRoutes } from "@/router/router";
// import Header from "./header/index";
// import Sider from "./sider/index";
// import Footer from "./footer/index";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    TagOpenPage,
    // Header,
    // Sider,
    // Footer,
  },
  data() {
    return {
      isCollapsed: false,
      menuList: [
        "ARTICLE_LIST",
        "ADD_ARTICLE",
        "UPDATE_ARTICLE",
        "SELECT_ARTICLE",
        "DELETE_ARTICLE",
      ],
      breadList: [],
    };
  },
  computed: {
    ...mapState({
      auth(state) {
        // console.log("state.auth.auth");
        // console.log(state.auth.auth);
        // console.log(this.menuList);
        // console.log(state.auth.auth == this.menuList);
        return state.auth.auth;
      },
      tagList(state) {
        return state.app.tagOpenPageList;
      },
    }),
    activeName() {
      // console.log(this.$route.name)
      return this.$route.name;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  methods: {
    ...mapMutations(["app/addTagOpenPage"]),
    collapsedSider() {
      console.log(this.isCollapsed);
      this.isCollapsed = !this.isCollapsed;
    },
    findItem(source, target) {
      var res = false;
      function digui(source, target) {
        let ress = "";
        try {
          source.forEach((item) => {
            console.log(target);
            if (item.name == target) {
              ress = item;
              console.log(res);
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
      // console.log("]]]]]]]]]]]]");
      return res;
    },
    changeMenu(path) {
      // console.log("ppppppppppp");
      // console.log(path);
      // console.log(this.menuList);
      // this.findItem(this.menuList,path)
      // 判断当前跳转页面有没有在tagOpenPageList里面
      // 查询点击跳转的路由信息
      let target = this.findItem(this.menuList, path);
      // console.log("target");
      // console.log(target);
      // console.log(this.tagList);
      // console.log(path);
      let tag;
      let bool = utils.exist(this.tagList, path);
      // console.log(bool)
      if (!bool) {
        this['app/addTagOpenPage'](target)
      }
      // console.log(tag);
      // console.log("000000000");
      // console.log(this["app/addTagOpenPage"]);
      // console.log(this.$store.commit("app/addTagOpenPage"));
      // this["app/addTagOpenPage"](path);
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
  mounted() {
    // console.log(roleRoutes);

    // this.menuList = roleRoutes;
    this.menuList = this.$router.options.routes;
  },
};
</script>

<style scoped>
</style>