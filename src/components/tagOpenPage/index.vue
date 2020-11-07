<template>
  <div>
    <div class="tagListWrap">
      <Icon class="arrow arrow-left" type="ios-arrow-back" size="24" />
      <Icon class="arrow arrow-right" type="ios-arrow-forward" size="24" />
      <div class="tagList">
        <Tag
          v-for="(item, index) in tagOpenPageList"
          :key="index"
          type="dot"
          :closable="isClosable(item.name)"
          :color="activeColor(item.name)"
          @click.native="onChangeTag(item.name)"
        >
          {{ item.meta.title }}
        </Tag>
      </div>
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
        console.log("0000", v);
        if (v == this.currentTag) {
          return "#41b883";
        } else {
          return "#e8eaec";
        }
      };
    },
    isClosable() {
      return (v) => {
        console.log(v);
        return v !== "dashboard" ? true : false;
      };
    },
  },
  watch: {
    $route() {
      this.currentTag = this.$route.name;
      console.log("999999999", this.$route.name);
    },
  },
  methods: {
    ...mapMutations(["app/addTagOpenPage"]),
    onChangeTag(v) {
      console.log(v);
      this.$router.push({ name: v });
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
  },

  created() {
    this.menuList = this.$router.options.routes;
    this.currentTag = this.$route.name;
    console.log(this);
    console.log(this.currentTag);
    console.log(this.tagOpenPageList);
    let target = this.findItem(this.menuList, this.currentTag);
    let bool = utils.exist(this.tagOpenPageList, target);
    // console.log(bool)
    if (!bool) {
      this["app/addTagOpenPage"](target);
    }
  },
  mounted() {},
};
</script>

<style scoped>
.tagListWrap {
  position: relative;
  /* width: 500px; */
  height: 50px;
  line-height: 50px;
  background: #f0f0f0;
  white-space: nowrap;
  padding: 0 30px;
}
.tagList {
  width: 100%;
  background: red;
  overflow: hidden;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
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