<template>
  <div>
    <base-form
      v-if="columnForm && columnForm.list"
      ref="hssBaseForm"
      :fromData="columnForm"
      :initData="initData"
      :init="init"
      @onSubmit="onSubmit"
    >
    </base-form>
  </div>
</template>

<script>
import { findOne } from "../../api/user";
import { mapState } from "vuex";
import baseForm from "../../components/hssComponents/form/base-form/index";

export default {
  components: { baseForm },
  data() {
    return {
      detail: {},
      init: true,
      initData: {},
      columnForm: {},
      // columnForm: {
      //   // submitBtn: true,
      //   list: [
      //     {
      //       type: "Input",
      //       name: "昵称",
      //       prop: "username",
      //       placeholder: "请输入昵称",
      //       disabled: true,
      //       // required: true,
      //     },
      //     {
      //       name: "标题",
      //       type: "Input",
      //       prop: "title",
      //       placeholder: "请输入标题",
      //       // required: true,
      //     },
      //     {
      //       name: "头像",
      //       type: "Upload",
      //       isObject: true,
      //       prop: "img",
      //       uploaOption: {
      //         maxSize: 1024 * 10,
      //         fileNameLength: 20,
      //       },
      //       // required: true,
      //     },
      //     {
      //       type: "Input",
      //       name: "发布文章数量",
      //       prop: "articles",
      //       placeholder: "请输入发布文章数量",
      //       // required: true,
      //     },
      //     {
      //       type: "Input",
      //       name: "收到点赞数量",
      //       prop: "stars",
      //       placeholder: "请输入收到点赞数量",
      //       // required: true,
      //     },
      //     {
      //       name: "状态",
      //       type: "Radio",
      //       data: [
      //         { label: "已通过", value: 1 },
      //         { label: "待审核", value: 0 },
      //       ],
      //       prop: "status",
      //       required: true,
      //     },
      //   ],
      // },
    };
  },
  computed: {
    ...mapState("user", ["id", "role", "auth"]),
  },
  methods: {
    onSubmit() {
      this.$refs.hssBaseForm.submit(async (v) => {
        if (v) {
          console.log(v);
          // return;
          // if (typeof v.img == "object") {
          //   await deleteQiniu(this.initData.img.slice(33));
          let upImg = await this.qiniuUpload(v.img);
          console.log(upImg);
          v.img = upImg;
          let upUrl = await this.qiniuUpload(v.url);
          v.url = upUrl;
          console.log(upUrl);
          //   console.log(res);
          //   v.img = res;
          // }
          // if (typeof v.url == "object") {
          //   await deleteQiniu(this.initData.url.slice(33));
          //   let res = await this.qiniuUpload(v.url);
          //   v.url = res;
          // }
          addMusic(v)
            .then((res) => {
              console.log(res);
              this.$Message.success({
                content: res.message,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      });
    },
  },
  created() {},
  mounted() {
    findOne(this.id).then((res) => {
      console.log(res);
      this.detail = res.detail;
      this.columnForm = {
        // submitBtn: true,
        list: [
          {
            type: "Input",
            name: "昵称",
            prop: "username",
            placeholder: "请输入昵称",
            required: true,
          },
          {
            name: "标题",
            type: "Input",
            prop: "title",
            placeholder: "请输入标题",
            // required: true,
          },
          {
            name: "头像",
            type: "Upload",
            isObject: true,
            prop: "img",
            uploaOption: {
              maxSize: 1024 * 10,
              fileNameLength: 20,
            },
            // required: true,
          },
          {
            type: "Input",
            name: "发布文章数量",
            prop: "articles",
            // placeholder: "请输入发布文章数量",
            disabled: true,
            // required: true,
          },
          {
            type: "Input",
            name: "收到点赞数量",
            prop: "stars",
            // placeholder: "请输入收到点赞数量",
            disabled: true,
            // required: true,
          },
          {
            name: "状态",
            type: "Radio",
            data: [
              { label: "已通过", value: 1 },
              { label: "待审核", value: 0 },
            ],
            prop: "status",
            disabled: true,
            // required: true,
          },
        ],
      };
      res.detail.articles = res.detail.articles.length;
      res.detail.stars = res.detail.stars.length;
      this.initData = res.detail;
    });
  },
};
</script>

<style scoped></style>
