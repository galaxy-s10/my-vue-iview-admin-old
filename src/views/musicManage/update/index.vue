<template>
  <div>
    <base-form
      ref="hssBaseForm"
      v-if="initData.id"
      :fromData="columnForm"
      :initData="initData"
      :init="init"
      @onSubmit="onSubmit"
    >
    </base-form>
    <div v-else>请在音乐列表选择要编辑的音乐</div>
    <!-- <i-button @click="confirm">修改</i-button> -->
    <!-- <markdown ref="md" v-if="this.form.content != null" /> -->
  </div>
</template>

<script>
import hssUpload from "../../../components/upload/index";
import baseForm from "../../../components/hssComponents/form/base-form/index";
import { getTypeList } from "../../../api/type";
import { findMusic, updateMusic } from "../../../api/music";
import { getQiniuToken, deleteQiniu } from "../../../api/qiniu";
import { mapState } from "vuex";

import * as qiniu from "qiniu-js";

export default {
  components: { baseForm, hssUpload },
  data() {
    return {
      tagList: [],
      form: {
        id: "",
        title: "",
        tags: "",
        type: "",
        content: "",
        img: "",
        createdAt: "",
        updatedAt: "",
      },
      columnForm: {},
      initData: {},
      // init: false,
      init: true,
      headerImg: [],
      oldImgList: [],
      newimg: null,
      typeList: [],
    };
  },
  computed: {
    ...mapState({
      user_id: (state) => state.user.id,
      auth: (state) => state.user.auth,
    }),
    // ...mapState("user", ["auth"]),
  },
  methods: {
    // 上传七牛云图片
    async qiniuUpload(file) {
      const datetime = new Date();
      const key = datetime.getTime() + file.name;
      const { uploadToken } = await getQiniuToken();
      const uptoken = uploadToken;
      const putExtra = {
        customVars: { "x:user_id": `${this.user_id}` },
      };
      const config = { useCdnDomain: true };
      const observable = qiniu.upload(file, key, uptoken, putExtra, config);
      const that = this;
      return new Promise(function (resolve, reject) {
        const subscription = observable.subscribe({
          // next: 接收上传进度信息的回调函数
          next(res) {
            const percent = res.total.percent; // 当前上传进度
            console.log(percent);
            // that.percent = parseInt(percent.toFixed());
          },
          // error: 上传错误后触发
          error(err) {
            console.log("上传七牛云图片错误");
            reject(err);
          },
          // complete: 接收上传完成后的后端返回信息
          complete(ress) {
            console.log("上传七牛云图片成功");
            resolve("https://img.cdn.zhengbeining.com/" + ress.key);
          },
        });
      });
    },
    onSubmit() {
      this.$refs.hssBaseForm.submit(async (v) => {
        if (v) {
          if (!this.auth.includes("UPDATE_MUSIC")) {
            this.$Message.error({
              content: "你没有权限修改音乐!",
            });
            return;
          }
          if (typeof v.img == "object") {
            await deleteQiniu(this.initData.img.slice(33));
            let res = await this.qiniuUpload(v.img);
            v.img = res;
          }
          if (typeof v.url == "object") {
            await deleteQiniu(this.initData.url.slice(33));
            let res = await this.qiniuUpload(v.url);
            v.url = res;
          }
          updateMusic(v)
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
    confirm() {},
  },
  async created() {
    console.log(this.$route);
    if (!this.$route.params.id) {
      return;
    }
    await findMusic(this.$route.params.id)
      .then((res) => {
        this.columnForm = {
          submitBtn: true,
          list: [
            {
              prop: "id",
            },
            {
              type: "Input",
              name: "音乐名",
              prop: "name",
              placeholder: "请输入音乐名",
              required: true,
            },
            {
              name: "作者",
              type: "Input",
              prop: "author",
              required: true,
            },
            // {
            //   name: "图片",
            //   type: "Input",
            //   prop: "img",
            //   required: true,
            // },
            // {
            //   name: "链接",
            //   type: "Input",
            //   prop: "url",
            //   required: true,
            // },
            {
              name: "音乐封面图",
              type: "Upload",
              isObject: true,
              prop: "img",
              // required: true,
            },
            {
              name: "音乐文件",
              type: "Upload",
              prop: "url",
              isObject: true,
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
              // required: true,
            },
          ],
        };
        // let deepTags = JSON.parse(JSON.stringify(res.detail.tags));
        this.initData = res.detail;
        // console.log(this.initData);
        this.form.id = res.detail.id;
        this.form.name = res.detail.name;
        this.form.author = res.detail.author;
        this.form.status = res.detail.status;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
};
</script>

<style scoped></style>
