
<template>
  <div>
    <Menu
      mode="vertical"
      width="100"
      theme="dark"
      @on-select="changeMenu"
      :active-name="activeName"
    >
      <template v-for="(item, index) in menuList">
        <template v-if="!item.hidden">
          <Submenu
            v-if="item.children && item.children.length > 1"
            :name="item.name"
            :key="index"
            v-auth="item.authKey"
          >
            <template slot="title">
              <Icon :type="item.meta.icon" />
              <span v-if="!isCollapsed">{{ item.meta.title }}223</span>
              <!-- <tree-item :icon="item.meta.icon" :title="item.meta.title"></tree-item> -->
            </template>
            <template v-for="(itemm, indexx) in item.children">
              <template v-if="!itemm.hidden">
                <MenuItem
                  :name="itemm.name"
                  :key="indexx"
                  v-auth="itemm.authKey"
                >
                  <span v-if="!isCollapsed">{{ itemm.meta.title }}222</span>
                </MenuItem>
              </template>
            </template>
          </Submenu>

          <MenuItem
            v-if="item.children && item.children.length <= 1"
            :name="item.children[0].name"
            :key="index"
            v-auth="item.authKey"
          >
            <Icon :type="item.meta.icon" />
            <span v-if="!isCollapsed">
              {{ item.meta.title }}
            </span>
          </MenuItem>
          <MenuItem v-if="!item.children" :name="item.name">
            <Icon :type="item.meta.icon" />
            <span v-if="!isCollapsed">
              {{ item.meta.title }}
            </span>
          </MenuItem>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    console.log(context.props);
    if (icon) {
      // if (icon.includes("el-icon")) {
      vnodes.push(<Icon type={icon} />);
      // } else {
      // vnodes.push(<svg-icon icon-class={icon} />);
      // }
    }

    if (title) {
      vnodes.push(<span>{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
