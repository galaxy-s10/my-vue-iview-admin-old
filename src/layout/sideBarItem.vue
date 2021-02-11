<template>
  <div>
    <Menu
      accordion
      mode="vertical"
      width="100"
      theme="dark"
      @on-select="changeMenu"
      :active-name="activeName"
    >
      <template v-for="(item, index) in menuList">
        <!-- <template v-if="!item.hidden && item.children && item.children.length > 1"> -->
        <template v-if="!item.hidden">
          <MenuItem
            v-if="item.children && item.children.length == 1"
            :name="item.children[0].path"
          >
            <!-- <MenuItem v-if="!item.children && item.children.length == 1" :name="item.name"> -->
            <Icon
              v-if="item.children[0].meta.icon"
              :type="item.children[0].meta.icon"
            />
            <span v-if="!isCollapsed"> {{ item.children[0].meta.title }} </span>
          </MenuItem>
          <Submenu
            v-if="item.children && item.children.length > 1"
            :name="item.path"
            :key="index"
          >
            <template slot="title">
              <Icon v-if="item.meta.icon" :type="item.meta.icon" />
              <span v-if="!isCollapsed">{{ item.meta.title }}</span>
            </template>
            <side-bar-item
              v-if="item.children"
              :menuList="item.children"
            ></side-bar-item>
          </Submenu>

          <MenuItem v-if="!item.children" :name="item.path">
            <Icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span v-if="!isCollapsed"> {{ item.meta.title }} </span>
          </MenuItem>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "sideBarItem",
  // functional: true,
  props: {
    menuList: {
      type: Array,
      default: function () {
        return [];
      },
    },
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
      return this.$route.path;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  data() {
    return {
      isCollapsed: false,
      breadList: [],
    };
  },
  methods: {
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
    changeMenu(path) {
      // 判断当前跳转页面有没有在tagOpenPageList里面
      // 查询点击跳转的路由信息
      console.log(path);
      this.$router.push({ path: path });
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
  // render(h, context) {
  //   const { icon, title } = context.props;
  //   const vnodes = [];
  //   console.log(context.props);
  //   if (icon) {
  //     // if (icon.includes("el-icon")) {
  //     vnodes.push(<Icon type={icon} />);
  //     // } else {
  //     // vnodes.push(<svg-icon icon-class={icon} />);
  //     // }
  //   }

  //   if (title) {
  //     vnodes.push(<span>{title}</span>);
  //   }
  //   return vnodes;
  // },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
