<template>
  <div>
    <div class="tagOpen">
      <div class="tagListWrap">
        <Icon
          class="arrow arrow-left"
          type="ios-arrow-back"
          size="24"
          @click.native="left"
        />
        <Icon
          class="arrow arrow-right"
          type="ios-arrow-forward"
          size="24"
          @click.native="right"
        />
        <div style="overflow: hidden" ref="tagListWrap">
          <div
            class="tagList"
            ref="tagList"
            :style="{
              transition: alltime,
              transform: `translateX(${offset}px)`,
            }"
          >
            <Tag
              v-for="(item, index) in tagOpenPageList"
              :key="index"
              type="dot"
              :closable="isClosable(item.name)"
              :color="activeColor(item.path)"
              @click.native="onChangeTag(item.name)"
            >
              {{ item.meta.title }}
            </Tag>
          </div>
        </div>
      </div>
      <!-- <div class="drop"> -->
      <Dropdown placement="bottom-end">
        <Button size="small">
          <!-- 下拉菜单 -->
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>关闭左侧</DropdownItem>
          <DropdownItem>关闭右侧</DropdownItem>
          <DropdownItem>关闭其他</DropdownItem>
          <DropdownItem>全部关闭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import utils from "../../libs/utils";
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      active: true,
      currentTag: null,
      menuList: [],
      offset: 0,
      alltime: "all .3s",
    };
  },
  computed: {
    ...mapState({
      tagOpenPageList(state) {
        return state.app.tagOpenPageList;
      },
    }),
    activeColor() {
      return (v) => {
        if (v == this.currentTag) {
          return "#41b883";
        } else {
          return "#e8eaec";
        }
      };
    },
    isClosable() {
      return (v) => {
        // console.log(v);
        return v !== "dashboard" ? true : false;
      };
    },
  },
  watch: {
    $route() {
      this.currentTag = this.$route.path;
      // console.log("999999999", this.$route.name);
    },
    tagOpenPageList() {
      this.$nextTick(() => {
        // console.log("sss");
        this.right();
      });
    },
  },
  methods: {
    ...mapMutations(["addTagOpenPage"]),
    // ...mapMutations({

    // }),
    left() {
      // console.log(this.$refs.tagList);
      // console.log(this.$refs.tagListWrap);
      let tagListWrapWidth = this.$refs.tagListWrap.clientWidth;
      let tagListWidth = this.$refs.tagList.clientWidth;
      let num = tagListWidth - tagListWrapWidth;
      console.log(tagListWidth, tagListWrapWidth, num);
      if (num > 0) {
        // 如果滚动距离不超过了容器的宽度，直接归零。
        if (num < tagListWrapWidth) {
          this.offset = 0;
        } else {
          // 如果滚动距离超过了容器的宽度，只能滚动一个容器的宽度
          let newnum = this.offset + tagListWrapWidth;
          // console.log(newnum)
          // 当滚到第一个时，不能再滚了
          this.offset = newnum > 0 ? 0 : newnum;
        }
        // console.log(num);
        // // this.alltime = "all 0s"
        // console.log(this.offset);
        // let newnum = num - this.offset;
        // this.offset = newnum;
        // console.log(this.offset);
      }
    },
    right() {
      // console.log(this.$refs.tagList);
      // console.log(this.$refs.tagListWrap);
      let tagListWrapWidth = this.$refs.tagListWrap.clientWidth;
      let tagListWidth = this.$refs.tagList.clientWidth;
      let num = tagListWidth - tagListWrapWidth;
      console.log(tagListWidth, tagListWrapWidth, num);
      if (num > 0) {
        console.log(num);
        this.offset = -num;
        // console.log(this.offset);
      }
    },
    onChangeTag(v) {
      // console.log(v);
      this.$router.push({ name: v });
    },
    findItem(source, target) {
      var res = false;
      function digui(source, target) {
        let ress = "";
        try {
          source.forEach((item) => {
            // console.log(target);
            if (item.path == target) {
              ress = item;
              // console.log(res);
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
  },

  created() {
    this.menuList = this.$router.options.routes;
    this.currentTag = this.$route.path;
    // console.log(this);
    // console.log(this.currentTag);
    // console.log(this.tagOpenPageList);
    let target = this.findItem(this.menuList, this.currentTag);
    console.log(target);
    let bool = utils.exist(this.tagOpenPageList, target.path);
    console.log(this.tagOpenPageList);
    console.log(bool)
    if (!bool) {
      this["addTagOpenPage"](target);
    }
  },
  mounted() {
    // if (this.isCollapsed) {
    // width = width - 200;
    // }
    // console.log(width);
    // console.log(this.$refs.tagListWrap )
    // console.log(this.$refs.tagListWrap.clientWidth )
    // console.log(utils.getStyle(this.$refs.tagListWrap,'width'))
    // console.log(utils.getStyle(this.$refs.tagListWrap,'clientWidth'))
    // console.log(utils.getStyle(this.$refs.tagList,'width'))
  },
};
</script>

<style scoped>
.tagOpen {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  background: #f5f7f9;
}
/* .drop {
  position: absolute;
  right: 0;
} */
.tagListWrap {
  position: relative;
  flex: 1;
  /* background: #f0f0f0; */
  /* white-space: nowrap; */
  padding: 0 30px;
  overflow: hidden;
}
.tagList {
  position: relative;
  /* width: 100%; */
  /* background: red; */
  white-space: nowrap;
  float: left;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}
.arrow:hover {
  cursor: pointer;
}
.arrow-left {
  left: 0;
}
.arrow-right {
  right: 0;
}
</style>