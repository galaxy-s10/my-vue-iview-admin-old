<template>
  <div>
    <base-form
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
import { findOne } from "@/api/user";
import { mapState } from "vuex";
import baseForm from "@/components/hssComponents/form/base-form/index";

export default {
  components: { baseForm },
  data() {
    return {
      detail: {},
      init: false,
      initData: {},
      columnForm: {
        // submitBtn: true,
        list: [
          {
            type: "Input",
            name: "原密码",
            mode: "password",
            prop: "password",
            placeholder: "请输入原密码",
            required: true,
          },
          {
            type: "Input",
            mode: "password",
            name: "新密码",
            prop: "password1",
            placeholder: "请输入新密码",
            required: true,
          },
          {
            type: "Input",
            mode: "password",
            name: "确认新密码",
            prop: "password2",
            placeholder: "请再次输入新密码",
            required: true,
          },
        ],
      },
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
    // findOne(this.id).then((res) => {
    //   console.log(res);
    //   this.detail = res.detail;
    // });
  },
};
</script>

<style scoped></style>
