<template>
  <div>
    更新文章
    <base-form
      v-if="initData.id"
      :fromData="columnForm"
      :initData="initData"
      :init="init"
    >
    </base-form>
    <!-- <markdown ref="md" v-if="this.form.content != null" /> -->
  </div>
</template>

<script>
import markdown from "../../../components/markdown/index";
import hssUpload from "../../../components/upload/index";
import baseForm from "../../../components/hssComponents/form/base-form/index";
import { findArticle, editArticle } from "@/api/article";
export default {
  components: { baseForm, markdown, hssUpload },
  data() {
    return {
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
      init: true,
      headerImg: [],
      oldImgList: [],
      newimg: null,
    };
  },
  computed: {},
  methods: {},
  created() {
    console.log(this.$route);

    findArticle(this.$route.params.id)
      .then((res) => {
        this.columnForm = {
          list: [
            {
              // name: "id",
              // type: "Input",
              prop: "id",
              // placeholder: "",
              // display:'none'
            },
            {
              name: "标题",
              type: "Input",
              prop: "title",
              placeholder: "请输入标题",
              required: true,
            },
            {
              name: "类型",
              type: "Input",
              prop: "type",
              placeholder: "请输入类型",
              required: true,
            },
            {
              name: "浏览量",
              type: "Input",
              prop: "click",
              placeholder: "请输入角色浏览量",
              required: true,
            },
            {
              name: "内容",
              type: "editor",
              prop: "content",
              content: "",
              placeholder: "请输入内容",
              required: true,
            },
            {
              name: "发布时间",
              type: "Date",
              prop: "createdAt",
              placeholder: "请选择发布时间",
              required: true,
            },
            {
              name: "最后更新",
              type: "Date",
              prop: "updatedAt",
              placeholder: "请选择最后更新时间",
              required: true,
            },
          ],
        };
        this.initData = res.list.rows[0];
        console.log(this.initData);
        this.form.id = res.list.rows[0].id;
        this.form.title = res.list.rows[0].title;
        this.form.type = res.list.rows[0].type;
        this.form.tags = res.list.rows[0].tags;
        this.form.content = res.list.rows[0].content;
        this.columnForm.list[4].content = res.list.rows[0].content;
        // 设置mardown编辑器内容
        // this.$refs["md"].content = res.list.rows[0].content;
        // 保存文章所有图片
        // this.oldImgList = this.regMd(res.list.rows[0].content);
        // 保存封面图
        if (res.list.rows[0].img) {
          this.headerImg.push({ name: "", url: res.list.rows[0].img });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
};
</script>

<style scoped></style>
