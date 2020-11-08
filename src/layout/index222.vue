<template>
  <div>
    <div class="layout">
      <Layout>
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          v-model="isCollapsed"
        >
          <Menu
            active-name="1-2"
            theme="dark"
            width="auto"
            :class="menuitemClasses"
          >
            <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon> <span>Option 1</span>
            </MenuItem>
            <MenuItem name="1-2">
              <Icon type="ios-search"></Icon> <span>Option 2</span>
            </MenuItem>
            <MenuItem name="1-3">
              <Icon type="ios-settings"></Icon> <span>Option 3</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Header :style="{ padding: 0 }" class="layout-header-bar">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{ margin: '0 20px' }"
              type="md-menu"
              size="24"
            ></Icon>
          </Header>
          <Content
            :style="{ margin: '20px', background: '#fff', minHeight: '260px' }"
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
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
    ...mapState("app", ["title"]),
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
        this["app/addTagOpenPage"](target);
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
    console.log("ppppp");
    console.log(this.$refs.layout1);
    console.log(utils.getStyle(this.$refs.layout1.$el, "width"));
    // console.log(roleRoutes);

    // this.menuList = roleRoutes;
    this.menuList = this.$router.options.routes;
  },
};
</script>

<style scoped>
.logo {
  color: white;
  width: 100%;
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>