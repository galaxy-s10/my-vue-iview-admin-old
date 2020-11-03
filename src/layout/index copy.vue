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
        <Menu mode="vertical" width="200" theme="dark" active-name="1">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-analytics" />
              文章管理
            </template>
            <MenuItem name="1-1">文章列表</MenuItem>
            <MenuItem name="1-2">新增文章</MenuItem>
            <MenuItem name="1-3">删除文章</MenuItem>
            <MenuItem name="1-4">查找文章</MenuItem>
            <MenuItem name="1-5">修改文章</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-analytics" />
              标签管理
            </template>
            <MenuItem name="2-1">标签列表</MenuItem>
            <MenuItem name="2-2">新增标签</MenuItem>
            <MenuItem name="2-3">删除标签</MenuItem>
            <MenuItem name="2-4">查找标签</MenuItem>
            <MenuItem name="2-5">修改标签</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics" />
              友链管理
            </template>
            <MenuItem name="3-1">友链列表</MenuItem>
            <MenuItem name="3-2">新增友链</MenuItem>
            <MenuItem name="3-3">删除友链</MenuItem>
            <MenuItem name="3-4">查找友链</MenuItem>
            <MenuItem name="3-5">修改友链</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-analytics" />
              评论管理
            </template>
            <MenuItem name="4-1">评论列表</MenuItem>
            <MenuItem name="4-2">新增评论</MenuItem>
            <MenuItem name="4-3">删除评论</MenuItem>
            <MenuItem name="4-4">查找评论</MenuItem>
            <MenuItem name="4-5">修改评论</MenuItem>
          </Submenu>
          <MenuItem name="5">
            <Icon type="ios-construct" />
            权限设置
          </MenuItem>
        </Menu>
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
// import Header from "./header/index";
// import Sider from "./sider/index";
// import Footer from "./footer/index";
export default {
  //   components: {
  //     Header,
  //     Sider,
  //     Footer,
  //   },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
</style>